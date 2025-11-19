from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from ..models.history import History
from ..models.user import User
from ..utils.responses import success
from ..utils.responses import error
from ..extensions import db

def list_history():
	verify_jwt_in_request(optional=False)
	identity = get_jwt_identity()
	user_id = int(identity) if identity is not None else None
	items = History.query.filter_by(user_id=user_id).order_by(History.created_at.desc()).all()
	return success([{
		"id": h.id,
		"url": h.url,
		"result": h.result,
		"confidence": h.confidence,
		"submitted_at": h.created_at.isoformat()
	} for h in items])

def admin_history():
	verify_jwt_in_request(optional=False)
	identity = get_jwt_identity()
	user = User.query.get(int(identity)) if identity is not None else None
	if not user or not user.is_admin:
		return error("Admin access required", 403)
	items = History.query.order_by(History.created_at.desc()).all()
	return success([{
		"id": h.id,
		"user_id": h.user_id,
		"url": h.url,
		"result": h.result,
		"confidence": h.confidence,
		"submitted_at": h.created_at.isoformat()
	} for h in items])

