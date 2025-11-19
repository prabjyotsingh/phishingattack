import re
from urllib.parse import urlparse

def is_valid_email(email: str) -> bool:
	return bool(re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", email or ""))

def is_valid_password(password: str) -> bool:
	return bool(password) and len(password) >= 6

def is_valid_url(url: str) -> bool:
	try:
		parsed = urlparse(url or "")
		return parsed.scheme in ("http", "https") and bool(parsed.netloc)
	except Exception:
		return False

