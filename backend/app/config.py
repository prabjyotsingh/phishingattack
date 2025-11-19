import os
from dotenv import load_dotenv

load_dotenv()

class BaseConfig:
	SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret")
	JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "dev-jwt-secret")
	SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL", "sqlite:///app.db")
	SQLALCHEMY_TRACK_MODIFICATIONS = False
	MODEL_PATH = os.getenv("MODEL_PATH", "./phishing_detector_model.joblib")
	CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000")
	RATELIMIT_DEFAULT = "200/hour"
	RATELIMIT_STORAGE_URI = "memory://"

class DevelopmentConfig(BaseConfig):
	DEBUG = True

class ProductionConfig(BaseConfig):
	DEBUG = False

def get_config(name: str | None):
	env = name or os.getenv("FLASK_ENV", "development")
	if env == "production":
		return ProductionConfig
	return DevelopmentConfig

