# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- Python 3.8+
- Node.js 14+
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/prabjyotsingh/phishingattack.git
cd phishingattack
```

### Step 2: Backend Setup

**Windows:**
```bash
cd backend
setup.bat
```

**Linux/Mac:**
```bash
cd backend
chmod +x setup.sh
./setup.sh
```

### Step 3: Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
```

### Step 4: Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
# Windows
run.bat

# Linux/Mac
./run.sh
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### Step 5: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api/health

### Test Accounts
- **Admin**: admin@example.com / Admin@123
- **User**: user@example.com / User@123

## 🐳 Docker Quick Start (Alternative)

```bash
# Make sure you have Docker and Docker Compose installed
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:5000
```

## 📖 Need More Help?
- Full documentation: See [README.md](README.md)
- Deployment guide: See [DEPLOYMENT.md](DEPLOYMENT.md)
- API documentation: See [backend/openapi.yaml](backend/openapi.yaml)

## 🆘 Common Issues

### Backend Issues
**"Model not found"**: Run `python train_model.py` in backend directory

**"Database not found"**: Run `flask db upgrade` in backend directory

**"Port 5000 already in use"**: Change port in `backend/app.py`

### Frontend Issues
**"Cannot connect to backend"**: Ensure backend is running on port 5000

**"Port 3000 already in use"**: Run `npm start` with different port: `PORT=3001 npm start`

### Docker Issues
**"Port already in use"**: Stop other services or change ports in `docker-compose.yml`

**"Cannot build image"**: Check Docker is running: `docker ps`

## 🔍 Testing the Application

1. **Open the app**: http://localhost:3000
2. **Login** with test account: admin@example.com / Admin@123
3. **Test URL detection**: Try these URLs:
   - Safe: https://google.com
   - Test phishing: https://g00gle.com
   - Test with IP: http://192.168.1.1

## 🎯 Next Steps
- Explore the admin dashboard
- Check your scan history
- Try different URLs
- Read the full documentation

## 💡 Tips
- Backend must be running before frontend
- Use separate terminal windows for backend and frontend
- Check console for any errors
- Make sure all dependencies are installed

---
Happy phishing detection! 🔒
