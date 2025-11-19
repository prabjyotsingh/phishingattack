# AI Phishing Detector – Backend

Flask backend for the AI Powered Phishing Detection Tool. Provides JWT auth, phishing URL prediction, history, and admin endpoints.

## Setup

1. Create and activate a virtual environment (optional but recommended).
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Environment variables (create `.env` in `backend/` or set in your shell):

```
FLASK_ENV=development
SECRET_KEY=change-this-in-production
JWT_SECRET_KEY=change-this-jwt-secret
DATABASE_URL=sqlite:///app.db
MODEL_PATH=./phishing_detector_model.joblib
CORS_ORIGINS=http://localhost:3000
PORT=5000
```

4. Initialize the database:

```bash
flask db init
flask db migrate -m "init"
flask db upgrade
```

## Run

```bash
python app.py
```

Server runs on `http://127.0.0.1:5000`.

## API Summary

- POST `/api/auth/signup`
- POST `/api/auth/login`
- GET `/api/user/profile` (JWT)
- PUT `/api/user/profile` (JWT)
- POST `/api/predict`
- GET `/api/history` (JWT)
- POST `/api/admin/retrain` (JWT admin)
- GET `/api/admin/stats` (JWT admin)

OpenAPI spec is available in `openapi.yaml`.

## Testing

```bash
pytest
```

## Notes

- If `MODEL_PATH` does not exist, `/api/predict` returns 503 with an error message.
- CORS is enabled for `http://localhost:3000` to allow the React frontend.

