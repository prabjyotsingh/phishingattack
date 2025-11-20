# Deployment Guide

This guide covers different deployment strategies for the AI Phishing Detector application.

## Table of Contents
- [Docker Deployment](#docker-deployment)
- [Heroku Deployment](#heroku-deployment)
- [AWS Deployment](#aws-deployment)
- [Production Considerations](#production-considerations)

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/prabjyotsingh/phishingattack.git
cd phishingattack
```

2. **Set environment variables**
```bash
# Create .env file in root directory
cat > .env << EOF
SECRET_KEY=your-production-secret-key
JWT_SECRET_KEY=your-production-jwt-secret
EOF
```

3. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost
- Backend API: http://localhost:5000

5. **View logs**
```bash
docker-compose logs -f
```

6. **Stop the application**
```bash
docker-compose down
```

## Heroku Deployment

### Backend Deployment

1. **Install Heroku CLI**
```bash
# Download from https://devcenter.heroku.com/articles/heroku-cli
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku app**
```bash
cd backend
heroku create phishing-detector-api
```

4. **Set environment variables**
```bash
heroku config:set SECRET_KEY=your-secret-key
heroku config:set JWT_SECRET_KEY=your-jwt-secret
heroku config:set DATABASE_URL=your-database-url
```

5. **Add Procfile**
```bash
echo "web: gunicorn app:app" > Procfile
```

6. **Add gunicorn to requirements.txt**
```bash
echo "gunicorn==21.2.0" >> requirements.txt
```

7. **Deploy**
```bash
git push heroku main
```

### Frontend Deployment

Use Netlify or Vercel for frontend deployment:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd frontend
npm run build
netlify deploy --prod --dir=build
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd frontend
vercel --prod
```

## AWS Deployment

### Using AWS Elastic Beanstalk

1. **Install EB CLI**
```bash
pip install awsebcli
```

2. **Initialize EB**
```bash
cd backend
eb init -p python-3.11 phishing-detector
```

3. **Create environment**
```bash
eb create phishing-detector-env
```

4. **Deploy**
```bash
eb deploy
```

5. **Set environment variables**
```bash
eb setenv SECRET_KEY=your-secret-key JWT_SECRET_KEY=your-jwt-secret
```

### Using AWS EC2

1. **Launch EC2 instance** (Ubuntu 22.04 LTS)

2. **SSH into instance**
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

3. **Install dependencies**
```bash
sudo apt update
sudo apt install python3-pip python3-venv nginx
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install nodejs
```

4. **Clone and setup**
```bash
git clone https://github.com/prabjyotsingh/phishingattack.git
cd phishingattack

# Backend
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install gunicorn

# Frontend
cd ../frontend
npm install
npm run build
```

5. **Configure Nginx**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/frontend/build;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

6. **Create systemd service for backend**
```bash
sudo nano /etc/systemd/system/phishing-backend.service
```

```ini
[Unit]
Description=Phishing Detector Backend
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/phishingattack/backend
Environment="PATH=/home/ubuntu/phishingattack/backend/venv/bin"
ExecStart=/home/ubuntu/phishingattack/backend/venv/bin/gunicorn -w 4 -b 0.0.0.0:5000 app:app

[Install]
WantedBy=multi-user.target
```

7. **Start services**
```bash
sudo systemctl enable phishing-backend
sudo systemctl start phishing-backend
sudo systemctl restart nginx
```

## Production Considerations

### Security
- Use strong SECRET_KEY and JWT_SECRET_KEY
- Enable HTTPS/SSL certificates
- Set DEBUG=False in production
- Use environment variables for sensitive data
- Implement rate limiting
- Add CORS restrictions
- Use secure database credentials

### Performance
- Use production WSGI server (Gunicorn, uWSGI)
- Enable caching
- Use CDN for static assets
- Optimize database queries
- Use connection pooling

### Monitoring
- Set up logging (CloudWatch, LogDNA, etc.)
- Monitor application performance
- Set up alerts for errors
- Track API usage and metrics

### Database
- Use PostgreSQL instead of SQLite in production
- Enable database backups
- Use connection pooling
- Optimize indexes

### Scalability
- Use load balancers
- Implement horizontal scaling
- Use managed services (RDS, ElastiCache)
- Consider microservices architecture

### Backup and Recovery
- Regular database backups
- Store model files in S3 or similar
- Document recovery procedures
- Test backup restoration

## Environment Variables

### Backend (.env)
```env
SECRET_KEY=strong-random-secret-key
JWT_SECRET_KEY=strong-random-jwt-secret
DATABASE_URL=postgresql://user:pass@host:5432/dbname
MODEL_PATH=./phishing_detector_model.joblib
CORS_ORIGINS=https://your-frontend-domain.com
FLASK_ENV=production
DEBUG=False
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Certbot)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Maintenance

### Update application
```bash
git pull origin main
# Backend
cd backend
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
sudo systemctl restart phishing-backend

# Frontend
cd ../frontend
npm install
npm run build
```

### Database migrations
```bash
cd backend
flask db migrate -m "description"
flask db upgrade
```

## Troubleshooting

### Check logs
```bash
# Systemd service logs
sudo journalctl -u phishing-backend -f

# Nginx logs
sudo tail -f /var/log/nginx/error.log

# Docker logs
docker-compose logs -f
```

### Common issues
- **Port already in use**: Change port in configuration
- **Database connection failed**: Check DATABASE_URL
- **CORS errors**: Update CORS_ORIGINS configuration
- **Model not found**: Ensure model file exists or train new model
