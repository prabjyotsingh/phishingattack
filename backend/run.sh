#!/bin/bash

# AI Phishing Detector - Backend Run Script
# This script starts the backend server

echo "🚀 Starting AI Phishing Detector Backend..."

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Check if model exists
if [ ! -f phishing_detector_model.joblib ]; then
    echo "⚠️  Model file not found. Training model..."
    python train_model.py
fi

# Run the application
echo "🌐 Backend server starting on http://localhost:5000"
python app.py
