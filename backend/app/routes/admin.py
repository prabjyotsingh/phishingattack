from flask import Blueprint
from flask_jwt_extended import jwt_required, get_jwt_identity, verify_jwt_in_request
from ..controllers.admin_controller import stats, retrain_placeholder
from ..utils.responses import error
from ..models.user import User

bp = Blueprint("admin", __name__)

def admin_required(fn):
	@jwt_required()
	def wrapper(*args, **kwargs):
		verify_jwt_in_request(optional=False)
		identity = get_jwt_identity()
		user = User.query.get(identity) if identity else None
		if not user or not getattr(user, "is_admin", False):
			return error("Admin access required", 403)
		return fn(*args, **kwargs)
	wrapper.__name__ = fn.__name__
	return wrapper

bp.get("/stats")(admin_required(stats))
bp.post("/retrain")(admin_required(retrain_placeholder))

