# Deployment Guide

## Local Development Deployment

### Option 1: Direct Node.js

**Prerequisites:**

- Node.js 18+
- npm

**Steps:**

```bash
# Clone repository
git clone https://github.com/yourusername/8-symbols-universe
cd 8-symbols-universe

# Install dependencies
npm install --workspaces

# Build
npm run build

# Run production server
npm run preview
```

**Access:** `http://localhost:5173`

---

## Docker Deployment

### Build Docker Image

```bash
# Build image
docker build -t 8-symbols-universe:latest .

# Tag for registry (if needed)
docker tag 8-symbols-universe:latest registry.example.com/8-symbols-universe:latest
```

### Run Docker Container

**Locally:**

```bash
docker run -p 3000:3000 -p 3001:3001 8-symbols-universe:latest
```

**With Environment Variables:**

```bash
docker run \
  -p 3000:3000 \
  -p 3001:3001 \
  -e NODE_ENV=production \
  -e VITE_API_URL=http://api.example.com \
  8-symbols-universe:latest
```

**With Volume Mounting:**

```bash
docker run \
  -p 3000:3000 \
  -p 3001:3001 \
  -v $(pwd)/data:/app/data \
  8-symbols-universe:latest
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - '3000:3000'
      - '3001:3001'
    environment:
      NODE_ENV: production
      VITE_API_URL: http://localhost:3001
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

Run:

```bash
docker-compose up -d
```

---

## Cloud Deployment

### AWS Deployment

#### Using EC2

```bash
# SSH into EC2 instance
ssh -i key.pem ubuntu@your-instance

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone and setup
git clone https://github.com/yourusername/8-symbols-universe
cd 8-symbols-universe
npm install --workspaces
npm run build

# Run with PM2 (process manager)
sudo npm install -g pm2
pm2 start "npm run preview"
pm2 startup
pm2 save
```

#### Using ECS (Elastic Container Service)

1. **Push image to ECR:**

```bash
# Get login token
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  123456789.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag 8-symbols-universe:latest \
  123456789.dkr.ecr.us-east-1.amazonaws.com/8-symbols-universe:latest

# Push
docker push 123456789.dkr.ecr.us-east-1.amazonaws.com/8-symbols-universe:latest
```

2. **Create ECS Task Definition** (JSON):

```json
{
  "family": "8-symbols-universe",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "app",
      "image": "123456789.dkr.ecr.us-east-1.amazonaws.com/8-symbols-universe:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/8-symbols-universe",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

3. **Create ECS Service** using AWS Console or CLI

### Google Cloud Run

```bash
# Authenticate
gcloud auth login

# Build image
gcloud builds submit --tag gcr.io/PROJECT_ID/8-symbols-universe

# Deploy
gcloud run deploy 8-symbols-universe \
  --image gcr.io/PROJECT_ID/8-symbols-universe \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --allow-unauthenticated
```

### Azure App Service

```bash
# Login
az login

# Create resource group
az group create -n 8symbols -l eastus

# Create App Service Plan
az appservice plan create \
  -n 8symbols-plan \
  -g 8symbols \
  --sku B1 \
  --is-linux

# Create App
az webapp create \
  -r "node|18-lts" \
  -n 8symbols-universe \
  -g 8symbols \
  -p 8symbols-plan

# Deploy from GitHub
az webapp deployment source config-zip \
  -n 8symbols-universe \
  -g 8symbols \
  -z ./deployment.zip
```

### Heroku (Legacy but simple)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create 8-symbols-universe

# Add buildpack
heroku buildpacks:add heroku/nodejs

# Deploy
git push heroku main

# View logs
heroku logs --tail
```

---

## Kubernetes Deployment

### Create Deployment Manifest

`k8s-deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: 8-symbols-universe
  namespace: default
spec:
  replicas: 2
  selector:
    matchLabels:
      app: 8-symbols-universe
  template:
    metadata:
      labels:
        app: 8-symbols-universe
    spec:
      containers:
        - name: app
          image: registry.example.com/8-symbols-universe:latest
          ports:
            - containerPort: 3000
            - containerPort: 3001
          env:
            - name: NODE_ENV
              value: production
          resources:
            requests:
              memory: '256Mi'
              cpu: '100m'
            limits:
              memory: '512Mi'
              cpu: '500m'
          livenessProbe:
            httpGet:
              path: /
              port: 3000
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /
              port: 3000
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: 8-symbols-universe-service
spec:
  selector:
    app: 8-symbols-universe
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
  type: LoadBalancer
```

### Deploy to Kubernetes

```bash
# Apply deployment
kubectl apply -f k8s-deployment.yaml

# Check status
kubectl get pods
kubectl get services

# View logs
kubectl logs -f deployment/8-symbols-universe

# Scale deployment
kubectl scale deployment 8-symbols-universe --replicas=3
```

---

## Environment Configuration

### Production Environment Variables

```env
# Application
NODE_ENV=production
PORT=3000

# API Configuration
VITE_API_URL=https://api.example.com
VITE_ENABLE_DEBUG=false

# Security
ENABLE_HTTPS=true
CORS_ORIGIN=https://example.com

# Performance
MAX_EXECUTION_TIME=10000
MAX_MEMORY_SIZE=30000

# Logging
LOG_LEVEL=info
```

---

## SSL/TLS Setup

### Using Let's Encrypt

```bash
# Install Certbot
sudo apt-get install -y certbot

# Get certificate
sudo certbot certonly --standalone -d example.com

# Auto-renew
sudo certbot renew --dry-run
```

### With Nginx Reverse Proxy

```nginx
server {
    listen 443 ssl;
    server_name 8-symbols.example.com;

    ssl_certificate /etc/letsencrypt/live/8-symbols.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/8-symbols.example.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

server {
    listen 80;
    server_name 8-symbols.example.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Performance Optimization

### CDN Configuration

For faster global delivery:

1. **CloudFlare:**
   - Add your domain
   - Enable caching
   - Enable compression

2. **CloudFront (AWS):**
   ```bash
   aws cloudfront create-distribution \
     --origin-domain-name example.com \
     --default-cache-behavior ...
   ```

### Database Setup

If adding backend services:

```bash
# PostgreSQL example
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=password \
  -v postgres_data:/var/lib/postgresql/data \
  postgres:15
```

### Monitoring

```bash
# PM2 Monitoring
pm2 monitor

# New Relic
npm install newrelic
# Add to app.js: require('newrelic');

# Datadog
npm install dd-trace
# Configure in app.js
```

---

## Backup & Recovery

### Data Backup

```bash
# Backup container volumes
docker run --rm \
  -v 8-symbols-universe_data:/data \
  -v $(pwd)/backups:/backup \
  ubuntu tar czf /backup/data.tar.gz /data
```

### Database Backup

```bash
# PostgreSQL backup
pg_dump dbname > backup.sql

# Restore
psql dbname < backup.sql
```

---

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable firewall rules
- [ ] Regular security updates
- [ ] Monitor application logs
- [ ] Enable rate limiting
- [ ] Use strong passwords
- [ ] Enable 2FA for admin access
- [ ] Regular backups

---

## Troubleshooting Deployment

### Port Already In Use

```bash
# Find process on port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Out of Memory

```bash
# Increase Node.js memory limit
node --max-old-space-size=2048 server.js
```

### High CPU Usage

```bash
# Profile with Node profiler
node --prof server.js

# Analyze profile
node --prof-process isolate-*.log > profile.txt
```

---

## Rollback Procedure

If deployment fails:

```bash
# Docker rollback
docker run -p 3000:3000 IMAGE_TAG_PREVIOUS

# Kubernetes rollback
kubectl rollout undo deployment/8-symbols-universe

# Git rollback
git revert <commit-hash>
git push origin main
```

---

**Your 8 Symbols Universe is ready for the world!** 🚀
