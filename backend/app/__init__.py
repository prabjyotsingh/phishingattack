import os
import logging
from flask import Flask
from .config import get_config
from .extensions import db, migrate, jwt, cors, limiter
from .utils.model import init_model

def create_app(config_name: str | None = None) -> Flask:
	app = Flask(__name__)

	# Config
	config_obj = get_config(config_name)
	app.config.from_object(config_obj)

	# Extensions
	db.init_app(app)
	migrate.init_app(app, db)
	jwt.init_app(app)

	# CORS
	cors.init_app(app, resources={r"/api/*": {"origins": app.config.get("CORS_ORIGINS", "*")}}, supports_credentials=True)

	# Rate limiting (optional but enabled)
	limiter.init_app(app)

	# Logging
	logging.basicConfig(level=logging.DEBUG)
	app.logger.info(f"DB URI: {app.config.get('SQLALCHEMY_DATABASE_URI')}")
	app.logger.info(f"CORS origins: {app.config.get('CORS_ORIGINS')}")

	# Load model once
	model = init_model(app.config.get("MODEL_PATH"))
	if model is not None:
		app.logger.info("Model loaded successfully at startup.")
	else:
		app.logger.warning("Model not loaded at startup. Check MODEL_PATH.")

	# Blueprints
	from .routes.auth import bp as auth_bp
	from .routes.user import bp as user_bp
	from .routes.predict import bp as predict_bp
	from .routes.history import bp as history_bp
	from .routes.admin import bp as admin_bp

	app.register_blueprint(auth_bp, url_prefix="/api/auth")
	app.register_blueprint(user_bp, url_prefix="/api/user")
	app.register_blueprint(predict_bp, url_prefix="/api")
	app.register_blueprint(history_bp, url_prefix="/api")
	app.register_blueprint(admin_bp, url_prefix="/api/admin")

	# Seed users (admin and user) if not exist
	from .models.user import User
	with app.app_context():
		admin = User.query.filter_by(email="admin@example.com").first()
		if not admin:
			admin = User(name="Admin", email="admin@example.com", is_admin=True)
			admin.set_password("Admin@123")
			db.session.add(admin)
		user = User.query.filter_by(email="user@example.com").first()
		if not user:
			user = User(name="User", email="user@example.com", is_admin=False)
			user.set_password("User@123")
			db.session.add(user)
		db.session.commit()

	# Health
	@app.get("/api/health")
	def health():
		return {"status": "ok"}, 200

	return app

