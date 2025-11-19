import os
from dotenv import load_dotenv

# Load environment variables from .env (if present)
load_dotenv()

class Config:
	# Core secrets
	SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key")
	JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")
	# Avoid PyJWT 'sub' string enforcement by using a custom identity claim
	JWT_IDENTITY_CLAIM = os.getenv("JWT_IDENTITY_CLAIM", "user_id")
	# Model version for admin stats
	MODEL_VERSION = os.getenv("MODEL_VERSION", "v1.0")

	# Database
	SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///app.db")
	SQLALCHEMY_TRACK_MODIFICATIONS = False

	# Model
	MODEL_PATH = os.getenv("MODEL_PATH", "./phishing_detector_model.joblib")

	# CORS
	CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000")


