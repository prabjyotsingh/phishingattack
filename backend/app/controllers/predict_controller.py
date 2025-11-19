from flask import current_app, request
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from ..extensions import db
from ..models.history import History
from ..models.user import User
from ..utils.responses import success, error
from ..utils.security import is_valid_url
from ..utils.model import MODEL, extract_features_from_url, analyze_url
import logging

def predict():
	body = request.get_json(silent=True) or {}
	url = (body.get("url") or "").strip()
	if not is_valid_url(url):
		return error("Invalid URL", 400)

	model = MODEL
	if model is None:
		return error("Model not available. Please upload/train the model.", 503)

	# Deterministic phishing logic (homoglyph/typo aware)
	label, conf, dbg = analyze_url(url)
	# Optionally, if model exists and supports predict_proba, blend conservatively but remain deterministic:
	try:
		features = extract_features_from_url(url)
		if hasattr(model, "predict_proba"):
			mp = float(model.predict_proba([features])[0][1])
			# weighted without randomness; bias to rule-based result
			conf = round(0.7*conf + 0.3*mp, 4)
			if conf >= 0.5:
				label = "phishing"
			else:
				label = "safe"
	except Exception:
		pass

	logging.getLogger(__name__).debug({"url": url, **dbg, "confidence": conf, "result": label})

	# Save to history if user is authenticated (optional)
	user_id = None
	try:
		verify_jwt_in_request(optional=True)
		identity = get_jwt_identity()
		user_id = int(identity) if identity is not None else None
	except Exception:
		user_id = None
	try:
		h = History(user_id=user_id, url=url, result=label, confidence=float(conf))
		db.session.add(h)
		db.session.commit()
		logging.getLogger(__name__).debug(f"Saved history id={h.id} user_id={user_id}")
	except Exception:
		db.session.rollback()

	return success({"url": url, "result": label, "confidence": round(float(conf), 4)})

