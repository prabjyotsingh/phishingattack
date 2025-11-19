from flask import current_app
from sqlalchemy import func
from ..extensions import db
from ..models.user import User
from ..models.history import History
from ..utils.responses import success

def stats():
	total_users = db.session.scalar(db.select(func.count(User.id))) or 0
	total_requests = db.session.scalar(db.select(func.count(History.id))) or 0
	phishing_count = db.session.scalar(db.select(func.count()).select_from(History).filter(History.result == "phishing")) or 0
	phishing_rate = (phishing_count / total_requests) if total_requests > 0 else 0.0
	model_version = current_app.config.get("MODEL_VERSION", "v1.0")
	return success({
		"totalUsers": total_users,
		"totalRequests": total_requests,
		"phishingCount": phishing_count,
		"phishingRate": round(phishing_rate, 4),
		"modelVersion": model_version
	})

def retrain_placeholder():
	# In a real implementation, trigger a background job or training script.
	return success(message="Retrain started (placeholder)")

