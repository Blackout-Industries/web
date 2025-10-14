# Deployment Guide

Comprehensive deployment guide for the Blackout Industries website across multiple platforms.

## Table of Contents

- [Docker Self-Hosted](#docker-self-hosted)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [Custom Nginx Server](#custom-nginx-server)
- [Environment Variables](#environment-variables)
- [SSL/TLS Configuration](#ssltls-configuration)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## Docker Self-Hosted

### Production Build

The project includes a multi-stage Dockerfile optimized for production:

```bash
# Build production image
docker build -t blackout-web:latest --target production .

# Verify image size (~50MB)
docker images blackout-web:latest
```

### Running Production Container

**Basic deployment:**

```bash
# Run on port 80
docker run -d \
  --name blackout-web \
  -p 80:80 \
  --restart unless-stopped \
  blackout-web:latest

# Verify deployment
curl http://localhost
docker logs blackout-web
```

**With custom port:**

```bash
# Run on port 8080
docker run -d \
  --name blackout-web \
  -p 8080:80 \
  --restart unless-stopped \
  blackout-web:latest
```

**With SSL termination (using reverse proxy):**

```bash
# Run on internal port, proxy handles SSL
docker run -d \
  --name blackout-web \
  -p 127.0.0.1:3000:80 \
  --restart unless-stopped \
  blackout-web:latest
```

### Docker Compose Production

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'

services:
  web:
    build:
      context: .
      target: production
    image: blackout-web:latest
    container_name: blackout-web
    restart: unless-stopped
    ports:
      - "80:80"
    labels:
      - "com.blackout.app=website"
      - "com.blackout.env=production"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost"]
      interval: 30s
      timeout: 10s
      retries: 3
```

**Deploy with Docker Compose:**

```bash
# Build and start
docker compose -f docker-compose.prod.yml up -d --build

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Stop deployment
docker compose -f docker-compose.prod.yml down

# Update deployment (pull new changes)
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

### Container Management

```bash
# View container status
docker ps -a

# View real-time logs
docker logs -f blackout-web

# Restart container
docker restart blackout-web

# Stop and remove container
docker stop blackout-web
docker rm blackout-web

# Execute command in running container
docker exec blackout-web sh -c "curl localhost"
```

### Docker with Reverse Proxy (Nginx/Traefik)

**Example Nginx reverse proxy config:**

```nginx
# /etc/nginx/sites-available/blackout-web
server {
    listen 80;
    server_name blackoutindustries.com www.blackoutindustries.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Example Traefik labels in docker-compose:**

```yaml
services:
  web:
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.blackout-web.rule=Host(`blackoutindustries.com`)"
      - "traefik.http.routers.blackout-web.entrypoints=websecure"
      - "traefik.http.routers.blackout-web.tls.certresolver=letsencrypt"
```

---

## Vercel Deployment

Vercel provides zero-config deployment for Nuxt 3 applications.

### Prerequisites

- Vercel account (free tier available)
- GitHub/GitLab/Bitbucket repository

### Initial Setup

**Option 1: Vercel Dashboard (Recommended)**

1. Visit [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your Git repository
4. Vercel auto-detects Nuxt 3
5. Click "Deploy"

**Option 2: Vercel CLI**

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview environment
vercel

# Deploy to production
vercel --prod
```

### Configuration

Create `vercel.json` in project root:

```json
{
  "buildCommand": "npm run generate",
  "outputDirectory": ".output/public",
  "framework": "nuxtjs",
  "regions": ["iad1"],
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Environment Variables

Set in Vercel dashboard: **Settings → Environment Variables**

```bash
# Optional for future features
FORMSPREE_ENDPOINT=https://formspree.io/f/your-id
GTM_ID=GTM-XXXXXXX
```

### Custom Domain

1. Go to **Project Settings → Domains**
2. Add your domain: `blackoutindustries.com`
3. Configure DNS:

```dns
# A Record (for root domain)
Type: A
Name: @
Value: 76.76.21.21

# CNAME Record (for www subdomain)
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Vercel automatically provisions SSL certificate

### Deployment Workflow

**Automatic Deployments:**

- Push to `main` branch → Production deployment
- Push to other branches → Preview deployment
- Pull requests → Preview deployment with unique URL

**Manual Deployment:**

```bash
# Preview deployment
vercel

# Production deployment
vercel --prod

# Rollback to previous deployment
vercel rollback
```

---

## Netlify Deployment

Netlify offers simple deployment with powerful features.

### Prerequisites

- Netlify account (free tier available)
- GitHub/GitLab/Bitbucket repository

### Initial Setup

**Option 1: Netlify Dashboard (Recommended)**

1. Visit [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Configure build settings:
   - **Build command:** `npm run generate`
   - **Publish directory:** `.output/public`
5. Click "Deploy site"

**Option 2: Netlify CLI**

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize Netlify in project
netlify init

# Deploy to preview
netlify deploy

# Deploy to production
netlify deploy --prod
```

### Configuration

Create `netlify.toml` in project root:

```toml
[build]
  command = "npm run generate"
  publish = ".output/public"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### Environment Variables

Set in Netlify dashboard: **Site Settings → Environment Variables**

```bash
# Optional for future features
FORMSPREE_ENDPOINT=https://formspree.io/f/your-id
GTM_ID=GTM-XXXXXXX
```

### Custom Domain

1. Go to **Site Settings → Domain Management**
2. Add custom domain: `blackoutindustries.com`
3. Configure DNS:

```dns
# Netlify DNS (recommended)
Type: NETLIFY
Name: @
Value: [provided by Netlify]

# Or use A records
Type: A
Name: @
Value: 75.2.60.5

# CNAME for www
Type: CNAME
Name: www
Value: [your-site].netlify.app
```

4. Enable HTTPS (automatic Let's Encrypt)

### Deployment Workflow

**Automatic Deployments:**

- Push to `main` branch → Production deployment
- Push to other branches → Deploy preview
- Pull requests → Deploy preview with URL

**Manual Deployment:**

```bash
# Preview deployment
netlify deploy

# Production deployment
netlify deploy --prod

# View deploy logs
netlify logs

# Open site in browser
netlify open:site
```

---

## Custom Nginx Server

Deploy static files to a custom server with Nginx.

### Generate Static Files

```bash
# Using Docker
docker compose run --rm dev npm run generate

# Without Docker (requires Node.js)
npm run generate

# Output location: .output/public/
```

### Copy Files to Server

```bash
# Using SCP
scp -r .output/public/* user@server:/var/www/blackout-web/

# Using rsync (recommended)
rsync -avz --delete .output/public/ user@server:/var/www/blackout-web/

# Using FTP/SFTP
# Upload contents of .output/public/ to your web root
```

### Nginx Configuration

Create `/etc/nginx/sites-available/blackout-web`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name blackoutindustries.com www.blackoutindustries.com;

    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name blackoutindustries.com www.blackoutindustries.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/blackoutindustries.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/blackoutindustries.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Document root
    root /var/www/blackout-web;
    index index.html;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # Main location block
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
}
```

### Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/blackout-web /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx
```

### Automated Deployment Script

Create `deploy.sh`:

```bash
#!/bin/bash
set -e

# Configuration
SERVER="user@your-server.com"
REMOTE_PATH="/var/www/blackout-web"
BUILD_DIR=".output/public"

echo "Building static site..."
npm run generate

echo "Deploying to $SERVER..."
rsync -avz --delete \
  --exclude='.git' \
  --exclude='node_modules' \
  "$BUILD_DIR/" "$SERVER:$REMOTE_PATH/"

echo "Reloading Nginx..."
ssh "$SERVER" "sudo systemctl reload nginx"

echo "Deployment complete!"
```

Make executable:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## Environment Variables

### Required Variables

Currently, no environment variables are required for the static site.

### Optional Variables

For future features, create `.env` file:

```bash
# Contact Form Backend (Formspree)
FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id

# Analytics (Google Tag Manager)
GTM_ID=GTM-XXXXXXX

# Build Environment
NODE_ENV=production
```

### Platform-Specific Configuration

**Vercel:**
- Set in dashboard: **Settings → Environment Variables**
- Prefix with `NUXT_PUBLIC_` for client-side access

**Netlify:**
- Set in dashboard: **Site Settings → Environment Variables**
- Automatically injected during build

**Docker:**
- Pass via `--env-file` flag: `docker run --env-file .env ...`
- Or in docker-compose.yml:

```yaml
services:
  web:
    env_file:
      - .env
```

---

## SSL/TLS Configuration

### Certbot (Let's Encrypt) for Custom Server

```bash
# Install Certbot
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d blackoutindustries.com -d www.blackoutindustries.com

# Certbot automatically configures Nginx

# Test automatic renewal
sudo certbot renew --dry-run

# Certificate auto-renews via cron/systemd timer
```

### Cloudflare SSL

1. Add site to Cloudflare
2. Update nameservers to Cloudflare's
3. Enable SSL/TLS: **Full (strict)** mode
4. Enable **Always Use HTTPS**
5. Optional: Enable **HTTP Strict Transport Security (HSTS)**

---

## Monitoring & Maintenance

### Health Checks

**Docker health check:**

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 30s
  timeout: 10s
  retries: 3
```

**External monitoring services:**

- [UptimeRobot](https://uptimerobot.com) - Free uptime monitoring
- [Pingdom](https://www.pingdom.com) - Uptime and performance
- [StatusCake](https://www.statuscake.com) - Global monitoring

### Performance Monitoring

**Lighthouse CI:**

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run Lighthouse audit
lhci autorun --collect.url=https://blackoutindustries.com
```

**Web Vitals Tracking:**

- Use Google Analytics 4 or Google Tag Manager
- Track Core Web Vitals: LCP, FID, CLS
- Set up alerts for performance degradation

### Error Tracking

**Sentry Integration:**

```bash
# Install Sentry SDK
npm install @sentry/vue

# Configure in nuxt.config.ts (future implementation)
```

### Backup Strategy

**Docker deployments:**

```bash
# Backup container
docker commit blackout-web blackout-web-backup-$(date +%Y%m%d)

# Export image
docker save blackout-web:latest | gzip > blackout-web-backup.tar.gz
```

**Static file deployments:**

```bash
# Backup website files
tar -czf blackout-web-$(date +%Y%m%d).tar.gz /var/www/blackout-web/

# Backup Nginx config
sudo cp /etc/nginx/sites-available/blackout-web ~/nginx-blackout-web.conf
```

### Update Workflow

1. **Test locally:** Run all tests and build production image
2. **Backup:** Create backup of current deployment
3. **Deploy:** Push changes to production
4. **Verify:** Check site functionality and performance
5. **Monitor:** Watch error logs and metrics for 24-48 hours
6. **Rollback:** If issues arise, revert to previous deployment

---

## Troubleshooting

### Docker Issues

**Container won't start:**

```bash
# Check logs
docker logs blackout-web

# Inspect container
docker inspect blackout-web

# Test build
docker build --no-cache -t blackout-web:test --target production .
```

**Port already in use:**

```bash
# Find process using port 80
sudo lsof -i :80

# Kill process or use different port
docker run -p 8080:80 blackout-web:latest
```

### Nginx Issues

**502 Bad Gateway:**

- Check upstream service is running
- Verify proxy_pass URL is correct
- Check firewall allows traffic

**Configuration test fails:**

```bash
# Test config
sudo nginx -t

# Check syntax errors in config file
# Fix and retest
```

### SSL Certificate Issues

**Certificate expired:**

```bash
# Renew certificate
sudo certbot renew

# Force renewal
sudo certbot renew --force-renewal

# Reload Nginx
sudo systemctl reload nginx
```

---

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass (unit, integration, E2E)
- [ ] Docker production build succeeds
- [ ] No console.log statements in code
- [ ] No hardcoded secrets or API keys
- [ ] Environment variables configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL/TLS certificate obtained
- [ ] Performance benchmarks meet targets (Lighthouse >90)
- [ ] Security headers configured
- [ ] Gzip compression enabled
- [ ] Monitoring and alerts set up
- [ ] Backup strategy in place
- [ ] Rollback plan documented

---

**For questions or issues, refer to the [README.md](./README.md) or [CONTRIBUTING.md](./CONTRIBUTING.md).**
