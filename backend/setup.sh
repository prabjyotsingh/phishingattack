#!/bin/bash

# AI Phishing Detector - Backend Setup Script
# This script sets up the backend environment

echo "🚀 Setting up AI Phishing Detector Backend..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔧 Activating virtual environment..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Upgrade pip
echo "⬆️  Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "📥 Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your configuration"
fi

# Initialize database
echo "🗄️  Initializing database..."
flask db upgrade

# Train model if it doesn't exist
if [ ! -f phishing_detector_model.joblib ]; then
    echo "🤖 Training ML model (this may take a few minutes)..."
    python train_model.py
else
    echo "✅ Model file already exists"
fi

echo ""
echo "✨ Setup complete! Run './run.sh' to start the backend server."
