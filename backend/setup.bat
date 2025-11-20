@echo off
REM AI Phishing Detector - Backend Setup Script (Windows)

echo Setting up AI Phishing Detector Backend...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Python is not installed. Please install Python 3.8 or higher.
    exit /b 1
)

echo Python found
python --version

REM Create virtual environment
echo Creating virtual environment...
python -m venv venv

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist .env (
    echo Creating .env file...
    copy .env.example .env
    echo Please update .env file with your configuration
)

REM Initialize database
echo Initializing database...
flask db upgrade

REM Train model if it doesn't exist
if not exist phishing_detector_model.joblib (
    echo Training ML model...
    python train_model.py
) else (
    echo Model file already exists
)

echo.
echo Setup complete! Run 'run.bat' to start the backend server.
pause
