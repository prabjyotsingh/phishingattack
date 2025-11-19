import os
from typing import List, Optional, Tuple
from joblib import load
import math
import re
import idna

# Global model pointer initialized at app startup
MODEL = None

def init_model(model_path: str) -> Optional[object]:
	"""
	Load the model once at app startup and keep it in MODULE scope (MODEL).
	This function is deterministic and does not perform any network calls.
	"""
	global MODEL
	if MODEL is not None:
		return MODEL
	if not os.path.exists(model_path):
		MODEL = None
		return None
	try:
		MODEL = load(model_path)
	except Exception:
		MODEL = None
	return MODEL

def _levenshtein(a: str, b: str) -> int:
	la, lb = len(a), len(b)
	if la == 0: return lb
	if lb == 0: return la
	dp = [[0]*(lb+1) for _ in range(la+1)]
	for i in range(la+1): dp[i][0] = i
	for j in range(lb+1): dp[0][j] = j
	for i in range(1, la+1):
		for j in range(1, lb+1):
			cost = 0 if a[i-1] == b[j-1] else 1
			dp[i][j] = min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost)
	return dp[la][lb]

def _normalize_domain(url: str) -> str:
	u = (url or "").strip().lower()
	if "://" in u:
		u = u.split("://", 1)[1]
	u = u.split("/", 1)[0]  # strip path/query
	return u.strip(" .")

def _decode_punycode(domain: str) -> str:
	try:
		return idna.decode(domain)
	except Exception:
		return domain

def _homoglyph_skeleton(s: str) -> str:
	# Map common confusables to ASCII forms
	mapping = {
		"0":"o", "1":"l", "3":"e", "5":"s", "@":"a", "$":"s", "!":"i",
		"í":"i", "ì":"i", "İ":"i", "I":"l", "Ｉ":"l",
		"о":"o", "Ｏ":"o", "Ｏ":"o",
	}
	return "".join(mapping.get(ch, ch) for ch in s)

def _entropy(s: str) -> float:
	if not s: return 0.0
	from collections import Counter
	c = Counter(s)
	total = len(s)
	h = 0.0
	for cnt in c.values():
		p = cnt/total
		h -= p * math.log2(p)
	return h

def analyze_url(url: str) -> Tuple[str, float, dict]:
	"""
	Deterministic phishing analysis using string-only features:
	- Normalize and decode punycode
	- Homoglyph skeleton mapping
	- Levenshtein distance to common brands
	- IP/dash checks and entropy measure
	Returns (label, confidence, debug_info)
	"""
	domain = _normalize_domain(url)
	unicode_domain = _decode_punycode(domain)
	# compare using registrable-like root (last two labels) to avoid 'www.' skew
	def _root(d: str) -> str:
		parts = d.split(".")
		return ".".join(parts[-2:]) if len(parts) >= 2 else d
	skeleton = _homoglyph_skeleton(_root(unicode_domain))

	brands = ["google.com","facebook.com","amazon.com","apple.com","microsoft.com","youtube.com","twitter.com","instagram.com","linkedin.com"]
	distances = [ _levenshtein(skeleton, b) for b in brands ]
	min_dist = min(distances) if distances else 99

	has_ip = bool(re.search(r"\\b\\d{1,3}(?:\\.\\d{1,3}){3}\\b", domain))
	extra_dashes = domain.count("--") >= 1 or domain.count("-") >= 3
	host = domain.split(":")[0]
	host_part = host.split(".",1)[0]
	ent = _entropy(host_part)
	high_entropy = ent > 3.5 and len(host_part) >= 8

	homoglyph_score = 0.0
	if any(ch in domain for ch in ["xn--","--","0","1","@","!"]):
		homoglyph_score += 0.4
	# strong signal for punycode labels
	if "xn--" in domain:
		homoglyph_score = max(homoglyph_score, 0.8)
	if min_dist <= 2:
		homoglyph_score += 0.6
	if extra_dashes:
		homoglyph_score += 0.2
	if has_ip:
		homoglyph_score += 0.3
	if high_entropy:
		homoglyph_score += 0.2
	homoglyph_score = min(1.0, homoglyph_score)

	is_phishing = homoglyph_score >= 0.7 or min_dist <= 2 or has_ip or extra_dashes or high_entropy
	confidence = round(min(1.0, 0.5 + homoglyph_score/2 + (0 if min_dist>2 else (2-min_dist)*0.1)), 4)
	label = "phishing" if is_phishing else "safe"

	debug = {
		"domain": domain,
		"unicode_domain": unicode_domain,
		"skeleton": skeleton,
		"min_dist": min_dist,
		"entropy": ent,
		"has_ip": has_ip,
		"extra_dashes": extra_dashes,
		"homoglyph_score": homoglyph_score,
	}
	return label, confidence, debug

def extract_features_from_url(url: str) -> List[float]:
	"""
	Deterministic, local-only feature extraction from the URL string.
	No network calls, randomness, or system-dependent behavior.
	Features (13 total, matching legacy training script layout):
	1) url_length
	2) domain_length
	3) num_dots
	4) num_slashes
	5) num_dashes
	6) num_underscores
	7) num_queries ('?')
	8) num_equals ('=')
	9) num_at ('@')
	10) num_digits
	11) has_ip_address (0/1 heuristic)
	12) has_https (0/1)
	13) sensitive_words_count
	"""
	u = url or ""
	lower = u.lower()
	sensitive_words = ["secure", "login", "signin", "bank", "account", "update", "verify", "password"]
	# domain extraction
	try:
		domain = u.split("/")[2]
	except Exception:
		domain = ""
	# ip heuristic
	import re as _re
	has_ip = 1.0 if _re.search(r"\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b", u) else 0.0
	num_digits = float(sum(c.isdigit() for c in u))
	features = [
		float(len(u)),
		float(len(domain)),
		float(u.count(".")),
		float(u.count("/")),
		float(u.count("-")),
		float(u.count("_")),
		float(u.count("?")),
		float(u.count("=")),
		float(u.count("@")),
		num_digits,
		has_ip,
		1.0 if "https" in lower else 0.0,
		float(sum(lower.count(w) for w in sensitive_words)),
	]
	return features

