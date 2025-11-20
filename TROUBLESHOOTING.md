# 🔧 Troubleshooting Guide

Common issues and their solutions for the AI Phishing Detector application.

## Backend Issues

### Issue: "Model not found" or "Model not available"
**Error**: `Model not available. Please upload/train the model.`

**Cause**: The ML model file is not present (it's excluded from Git due to size).

**Solution**:
```bash
cd backend
python train_model.py
```

This will train a new model using the CSV dataset and save it as `phishing_detector_model.joblib`.

---

### Issue: Database not found
**Error**: `OperationalError: no such table: users`

**Solution**:
```bash
cd backend
flask db upgrade
```

If that doesn't work, initialize migrations:
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

---

### Issue: Port 5000 already in use
**Error**: `OSError: [Errno 48] Address already in use`

**Solutions**:

1. **Find and kill the process**:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:5000 | xargs kill -9
   ```

2. **Change the port** in `backend/app.py`:
   ```python
   app.run(host="0.0.0.0", port=5001, debug=app.config.get("DEBUG", False))
   ```

---

### Issue: ModuleNotFoundError
**Error**: `ModuleNotFoundError: No module named 'flask'`

**Cause**: Virtual environment not activated or dependencies not installed.

**Solution**:
```bash
# Activate virtual environment
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

### Issue: CORS errors
**Error**: `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**: Update `backend/config.py`:
```python
CORS_ORIGINS = "http://localhost:3000,http://localhost:3001"
```

Or in `.env`:
```env
CORS_ORIGINS=http://localhost:3000
```

---

### Issue: JWT token errors
**Error**: `Token has expired` or `Invalid token`

**Solutions**:
1. Logout and login again
2. Clear browser localStorage
3. Check system time is correct
4. Increase token expiration in `backend/app/config.py`

---

## Frontend Issues

### Issue: Cannot connect to backend
**Error**: `Network Error` or `ERR_CONNECTION_REFUSED`

**Checks**:
1. ✅ Backend is running on port 5000
2. ✅ REACT_APP_API_URL is correct in `.env`
3. ✅ No firewall blocking the connection

**Solution**:
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Should return: {"status":"ok"}
```

---

### Issue: Port 3000 already in use
**Error**: `Something is already running on port 3000`

**Solutions**:

1. **Use different port**:
   ```bash
   # Windows (PowerShell)
   $env:PORT=3001; npm start
   
   # Linux/Mac
   PORT=3001 npm start
   ```

2. **Kill process on port 3000**:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:3000 | xargs kill -9
   ```

---

### Issue: npm install fails
**Error**: Various npm errors

**Solutions**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Try with legacy peer deps
npm install --legacy-peer-deps
```

---

### Issue: Blank page or white screen
**Checks**:
1. ✅ Check browser console for errors
2. ✅ Ensure `public/index.html` exists
3. ✅ Check `src/index.js` is correct

**Solution**:
```bash
# Rebuild
rm -rf build node_modules
npm install
npm start
```

---

## Docker Issues

### Issue: Cannot build Docker image
**Error**: `failed to solve with frontend dockerfile.v0`

**Solutions**:
1. Ensure Docker is running: `docker ps`
2. Check Dockerfile syntax
3. Clear Docker cache:
   ```bash
   docker system prune -a
   ```

---

### Issue: Port already in use (Docker)
**Error**: `Bind for 0.0.0.0:5000 failed: port is already allocated`

**Solution**:
```bash
# Stop conflicting containers
docker ps
docker stop <container_id>

# Or change ports in docker-compose.yml
ports:
  - "5001:5000"  # Host:Container
```

---

### Issue: Container exits immediately
**Solution**:
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Run interactively
docker-compose run backend bash
```

---

## Database Issues

### Issue: Database is locked
**Error**: `database is locked`

**Cause**: SQLite doesn't handle concurrent writes well.

**Solutions**:
1. Close all connections to the database
2. Restart the backend server
3. **For production**: Use PostgreSQL instead of SQLite

---

### Issue: Migration conflicts
**Error**: `Target database is not up to date`

**Solution**:
```bash
# Check migration status
flask db current

# Reset migrations (CAUTION: deletes data)
rm -rf migrations/
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

---

## Python Issues

### Issue: Wrong Python version
**Error**: `SyntaxError` or version mismatch

**Solution**:
```bash
# Check Python version
python --version  # Should be 3.8+

# Use specific version
python3.11 -m venv venv
```

---

### Issue: pip command not found
**Solution**:
```bash
# Use python -m pip instead
python -m pip install -r requirements.txt

# Or install pip
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
```

---

## Environment Variable Issues

### Issue: .env file not loaded
**Symptoms**: Using default values instead of .env values

**Solutions**:
1. Ensure `.env` file exists (copy from `.env.example`)
2. Check file is in correct directory
3. Restart the server after changing `.env`
4. Verify with:
   ```python
   import os
   from dotenv import load_dotenv
   load_dotenv()
   print(os.getenv("SECRET_KEY"))
   ```

---

## Testing Issues

### Issue: Tests fail
**Error**: Various test failures

**Solution**:
```bash
# Install test dependencies
pip install pytest pytest-flask

# Run tests with verbose output
pytest -v

# Run specific test
pytest tests/test_auth.py::test_login -v
```

---

## Performance Issues

### Issue: Slow response time
**Causes & Solutions**:

1. **Large dataset**: Optimize database queries, add indexes
2. **No caching**: Implement Redis caching
3. **Debug mode in production**: Set `DEBUG=False`
4. **Single worker**: Use gunicorn with multiple workers:
   ```bash
   gunicorn -w 4 app:app
   ```

---

## Common Setup Mistakes

### ❌ Mistake: Running without virtual environment
**Fix**: Always activate venv first
```bash
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

---

### ❌ Mistake: Wrong directory
**Fix**: Ensure you're in correct directory
```bash
# Backend commands must run from backend/
cd backend

# Frontend commands must run from frontend/
cd frontend
```

---

### ❌ Mistake: Missing dependencies
**Fix**: Install all dependencies
```bash
# Backend
pip install -r requirements.txt

# Frontend
npm install
```

---

### ❌ Mistake: Using production settings in development
**Fix**: Check `.env` file:
```env
FLASK_ENV=development
DEBUG=True
```

---

## Getting Help

If none of these solutions work:

1. **Check logs**:
   - Backend: Console output or `backend/logs/`
   - Frontend: Browser console (F12)
   - Docker: `docker-compose logs`

2. **Search Issues**: Check [GitHub Issues](https://github.com/prabjyotsingh/phishingattack/issues)

3. **Create Issue**: Provide:
   - Error message
   - Steps to reproduce
   - Environment (OS, Python version, Node version)
   - Relevant logs

4. **Read Documentation**:
   - [README.md](README.md)
   - [QUICKSTART.md](QUICKSTART.md)
   - [DEPLOYMENT.md](DEPLOYMENT.md)

---

## Quick Diagnostic Commands

```bash
# Check Python version
python --version

# Check Node version
node --version

# Check Docker
docker --version
docker-compose --version

# Check if ports are in use
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :3000

# Linux/Mac
lsof -ti:5000
lsof -ti:3000

# Check virtual environment is activated
which python  # Should point to venv

# Test backend health
curl http://localhost:5000/api/health

# Check database
python -c "from app.extensions import db; print(db)"
```

---

## Prevention Tips

1. ✅ Always use virtual environments
2. ✅ Keep dependencies updated
3. ✅ Use `.env` files for configuration
4. ✅ Read error messages carefully
5. ✅ Check logs first
6. ✅ Test in development before production
7. ✅ Keep backups of database
8. ✅ Document custom changes

---

**Still having issues? Open an issue on GitHub with detailed information!**
