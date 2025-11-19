from flask import Blueprint
from flask_jwt_extended import jwt_required
from ..controllers.auth_controller import signup, login, logout

bp = Blueprint("auth", __name__)

bp.post("/signup")(signup)
bp.post("/login")(login)
bp.post("/logout")(jwt_required()(logout))

