from flask import request
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from ..extensions import db
from ..models.user import User
from ..utils.responses import success, error
from ..utils.security import is_valid_email, is_valid_password

def get_profile():
	verify_jwt_in_request(optional=False)
	identity = get_jwt_identity()
	user_id = int(identity) if identity is not None else None
	user = User.query.get(user_id) if user_id else None
	return success({"user": {
		"id": user.id,
		"name": user.name,
		"email": user.email,
		"role": "admin" if user.is_admin else "user",
		"created_at": user.created_at.isoformat() if user.created_at else None,
	} if user else None})

def update_profile():
	body = request.get_json(silent=True) or {}
	name = (body.get("name") or "").strip()
	email = (body.get("email") or "").strip().lower()
	current_password = body.get("currentPassword") or ""
	new_password = body.get("newPassword") or ""

	verify_jwt_in_request(optional=False)
	identity = get_jwt_identity()
	user_id = int(identity) if identity is not None else None
	current_user = User.query.get(user_id) if user_id else None
	if not current_user:
		return error("Unauthorized", 401)

	# Validate fields if provided
	if name and len(name) < 2:
		return error("Name too short", 400)
	if email and not is_valid_email(email):
		return error("Invalid email", 400)

	# Email uniqueness
	if email and email != current_user.email:
		if User.query.filter_by(email=email).first():
			return error("Email already in use", 409)
		current_user.email = email

	if name:
		current_user.name = name

	# Password change optional
	if new_password:
		if not is_valid_password(new_password):
			return error("New password too weak", 400)
		if not current_password or not current_user.check_password(current_password):
			return error("Current password incorrect", 403)
		current_user.set_password(new_password)

	db.session.commit()
	return success({"user": {
		"id": current_user.id,
		"name": current_user.name,
		"email": current_user.email,
		"role": "admin" if current_user.is_admin else "user",
		"created_at": current_user.created_at.isoformat() if current_user.created_at else None,
	}}, "Profile updated")

