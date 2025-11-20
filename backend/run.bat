@echo off
REM AI Phishing Detector - Backend Run Script (Windows)

echo Starting AI Phishing Detector Backend...

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Check if model exists
if not exist phishing_detector_model.joblib (
    echo Model file not found. Training model...
    python train_model.py
)

REM Run the application
echo Backend server starting on http://localhost:5000
python app.py
