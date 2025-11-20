"""
AI Phishing Detector - Backend Application
Entry point for the Flask application.
"""

from config import Config
from app import create_app

# Create Flask application instance
app = create_app()

# Apply environment-based configuration
app.config.from_object(Config)

if __name__ == "__main__":
	# Run the application
	# In production, use a proper WSGI server like Gunicorn
	app.run(
		host="0.0.0.0",
		port=5000,
		debug=app.config.get("DEBUG", False)
	)