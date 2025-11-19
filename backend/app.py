from flask import Flask, jsonify
app = Flask(__name__)
@app.route('/')
def home():
    return {'message': 'AI Phishing Detector Backend is running!'}, 200

from config import Config
from app import create_app

app = create_app()
# Apply environment-based configuration
app.config.from_object(Config)

if __name__ == "__main__":
	app.run(host="0.0.0.0", port=5000, debug=app.config.get("DEBUG", False))