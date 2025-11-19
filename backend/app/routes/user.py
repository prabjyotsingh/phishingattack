from flask import Blueprint
from flask_jwt_extended import jwt_required
from ..controllers.user_controller import get_profile, update_profile

bp = Blueprint("user", __name__)

bp.get("/profile")(jwt_required()(get_profile))
bp.put("/profile")(jwt_required()(update_profile))

