from flask import request
from flask_jwt_extended import create_access_token
from ..extensions import db
from ..models.user import User
from ..utils.responses import success, error
from ..utils.security import is_valid_email, is_valid_password
import logging

def signup():
	body = request.get_json(silent=True) or {}
	name = (body.get("name") or "").strip()
	email = (body.get("email") or "").strip().lower()
	password = body.get("password") or ""

	if not name or not is_valid_email(email) or not is_valid_password(password):
		return error("Invalid input", 400)

	if User.query.filter_by(email=email).first():
		return error("Email already registered", 409)

	user = User(name=name, email=email)
	user.set_password(password)
	db.session.add(user)
	db.session.commit()

	token = create_access_token(identity=str(user.id))
	logging.getLogger(__name__).debug(f"Signup success for user_id={user.id}")
	return success({"token": token, "user": _user_payload(user)}, "Account created", 201)

def login():
	body = request.get_json(silent=True) or {}
	email = (body.get("email") or "").strip().lower()
	password = body.get("password") or ""

	if not is_valid_email(email) or not is_valid_password(password):
		return error("Invalid credentials", 400)

	user = User.query.filter_by(email=email).first()
	if not user or not user.check_password(password):
		return error("Invalid email or password", 401)

	token = create_access_token(identity=str(user.id))
	logging.getLogger(__name__).debug(f"Login success for user_id={user.id}")
	return success({"token": token, "user": _user_payload(user)}, "Logged in")

def logout():
	# Stateless JWT: Clients drop the token.
	return success(message="Logged out")

def _user_payload(user: User):
	return {
		"id": user.id,
		"name": user.name,
		"email": user.email,
		"role": "admin" if user.is_admin else "user",
		"created_at": user.created_at.isoformat() if user.created_at else None,
	}

