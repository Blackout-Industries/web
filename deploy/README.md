# Production Deployment Guide
## Raspberry Pi + Cloudflare Tunnel + Docker

This guide covers deploying Blackout Industries website on a Raspberry Pi using Cloudflare Tunnel for secure, zero-trust access.

---

## Architecture Overview

```
┌──────────────────┐
│   Internet       │
└────────┬─────────┘
         │
         │ HTTPS (443)
         │
┌────────▼─────────┐
│  Cloudflare Edge │  ← DDoS protection, caching, SSL
└────────┬─────────┘
         │
         │ Encrypted Tunnel (no open ports)
         │
┌────────▼─────────────────────┐
│   Raspberry Pi               │
│   (Local Network)            │
│                              │
│  ┌──────────────────────┐   │
│  │  Docker Network      │   │
│  │                      │   │
│  │  ┌────────────────┐ │   │
│  │  │  cloudflared   │ │   │  ← Tunnel daemon
│  │  └────────┬───────┘ │   │
│  │           │         │   │
│  │  ┌────────▼───────┐ │   │
│  │  │  blackout-web  │ │   │  ← Nginx + static site
│  │  └────────────────┘ │   │
│  │                      │   │
│  │  ┌────────────────┐ │   │
│  │  │  watchtower    │ │   │  ← Auto-updates (optional)
│  │  └────────────────┘ │   │
│  └──────────────────────┘   │
└──────────────────────────────┘
```

**Security Benefits:**
- ✅ No inbound firewall rules needed
- ✅ No public IP exposure
- ✅ Zero-trust network access model
- ✅ Cloudflare DDoS protection (free tier)
- ✅ Automatic HTTPS/SSL certificate management
- ✅ Container isolation with Docker networks
- ✅ No SSH port exposure required

---

## Prerequisites

### Hardware
- **Raspberry Pi 4** (4GB+ RAM recommended)
- **32GB+ microSD card** (Class 10 or better)
- **Stable internet connection**
- **Power supply** (official 5V/3A adapter recommended)

### Software
- **Raspberry Pi OS** (64-bit recommended)
- **Docker** & **Docker Compose**
- **Cloudflare account** (free tier works)
- **Domain name** managed by Cloudflare

### Cloudflare Setup
1. Domain added to Cloudflare
2. DNS managed by Cloudflare nameservers
3. Cloudflare Tunnel access (free)

---

## Quick Start

### 1. Prepare Raspberry Pi

```bash
# Update system
sudo apt-get update && sudo apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo apt-get install -y docker-compose

# Install git
sudo apt-get install -y git

# Reboot to apply group changes
sudo reboot
```

### 2. Clone Repository

```bash
# On Raspberry Pi
git clone https://github.com/Blackout-Industries/web.git
cd web/deploy
```

### 3. Setup Cloudflare Tunnel

```bash
# Make setup script executable
chmod +x setup-cloudflare-tunnel.sh

# Run interactive setup
./setup-cloudflare-tunnel.sh
```

The script will:
- Authenticate with Cloudflare
- Create a tunnel
- Configure DNS records
- Generate tunnel token
- Create `.env.prod` file

**Example output:**
```
🚇 Cloudflare Tunnel Setup for Blackout Industries
==================================================

✅ Setup Complete!
==================

Configuration Summary:
  Tunnel Name: blackout-web-prod
  Tunnel ID: abc123...
  Domain: blackout-industries.com
  Subdomain: www.blackout-industries.com

Next steps:
  1. Review deploy/docker-compose.prod.yml
  2. Run: docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
  3. Visit https://blackout-industries.com
```

### 4. Deploy Application

```bash
# Pull latest image
docker pull ghcr.io/blackout-industries/web:latest

# Start services
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### 5. Verify Deployment

```bash
# Check tunnel status
docker exec cloudflared-tunnel cloudflared tunnel info

# Check web container
docker exec blackout-web wget -qO- http://localhost:80 | head

# Visit your site
curl -I https://blackout-industries.com
```

---

## Configuration

### Environment Variables (`.env.prod`)

```bash
# Cloudflare Tunnel Configuration
CLOUDFLARE_TUNNEL_TOKEN=eyJhIjoi...  # From setup script
TUNNEL_ID=abc123...                   # From setup script
TUNNEL_NAME=blackout-web-prod         # From setup script
DOMAIN=blackout-industries.com        # Your domain
```

⚠️ **Security**: Never commit `.env.prod` to git! It's in `.gitignore`.

### Docker Compose Configuration

**File:** `deploy/docker-compose.prod.yml`

**Services:**
1. **web** - Main application (nginx + static site)
2. **cloudflared** - Tunnel daemon
3. **watchtower** - Auto-updates (optional)

**Networks:**
- `internal` - Bridge network for service communication
- No ports exposed to host (only accessible via tunnel)

---

## Operations

### Start/Stop Services

```bash
# Start
docker-compose -f deploy/docker-compose.prod.yml --env-file .env.prod up -d

# Stop
docker-compose -f deploy/docker-compose.prod.yml down

# Restart
docker-compose -f deploy/docker-compose.prod.yml restart

# Stop and remove volumes
docker-compose -f deploy/docker-compose.prod.yml down -v
```

### View Logs

```bash
# All services
docker-compose -f deploy/docker-compose.prod.yml logs -f

# Specific service
docker-compose -f deploy/docker-compose.prod.yml logs -f web
docker-compose -f deploy/docker-compose.prod.yml logs -f cloudflared

# Last 100 lines
docker-compose -f deploy/docker-compose.prod.yml logs --tail=100
```

### Update Application

#### Manual Update
```bash
# Pull latest image
docker pull ghcr.io/blackout-industries/web:latest

# Recreate container with new image
docker-compose -f deploy/docker-compose.prod.yml up -d --force-recreate web
```

#### Automatic Updates (Watchtower)
Watchtower automatically checks for updates every hour and updates containers with the `com.centurylinklabs.watchtower.enable=true` label.

**Disable Watchtower:**
```bash
# Comment out watchtower service in docker-compose.prod.yml
# Or stop it:
docker-compose -f deploy/docker-compose.prod.yml stop watchtower
```

### Health Checks

```bash
# Web container health
docker inspect blackout-web | jq '.[0].State.Health'

# Cloudflared tunnel health
docker inspect cloudflared-tunnel | jq '.[0].State.Health'

# Quick status check
docker-compose -f deploy/docker-compose.prod.yml ps
```

---

## Monitoring

### Resource Usage

```bash
# Container stats
docker stats

# Raspberry Pi system resources
htop

# Disk usage
df -h
docker system df
```

### Cloudflare Dashboard

Monitor traffic, performance, and security at:
- https://dash.cloudflare.com
- Navigate to: Traffic → Analytics
- Zero Trust → Access → Tunnels

**Key metrics:**
- Requests per second
- Bandwidth usage
- Cache hit ratio
- Threat analytics
- Tunnel status

---

## Troubleshooting

### Tunnel Not Connecting

```bash
# Check tunnel logs
docker logs cloudflared-tunnel

# Verify tunnel token
echo $CLOUDFLARE_TUNNEL_TOKEN

# Test tunnel manually
docker run --rm \
  -e TUNNEL_TOKEN=$CLOUDFLARE_TUNNEL_TOKEN \
  cloudflare/cloudflared:latest tunnel run

# Verify DNS records
dig blackout-industries.com
```

### Site Not Accessible

```bash
# Check web container
docker logs blackout-web

# Test locally
docker exec blackout-web wget -qO- http://localhost:80

# Check nginx config
docker exec blackout-web nginx -t

# Verify Cloudflare proxy status (orange cloud icon)
# DNS records should be "Proxied" not "DNS only"
```

### High Memory Usage

```bash
# Raspberry Pi has limited RAM (4GB typical)
# Monitor usage:
free -h

# Restart containers if needed:
docker-compose -f deploy/docker-compose.prod.yml restart

# Disable watchtower if not needed:
docker-compose -f deploy/docker-compose.prod.yml stop watchtower
```

### Container Won't Start

```bash
# Check logs for specific error
docker logs blackout-web

# Common issues:
# 1. Port conflict (shouldn't happen with tunnel)
# 2. Image pull failure (check network)
# 3. Permission issues

# Force recreate
docker-compose -f deploy/docker-compose.prod.yml up -d --force-recreate
```

---

## Security Best Practices

### 1. Firewall Configuration
```bash
# No inbound rules needed (tunnel handles all traffic)
# But ensure SSH is secured:
sudo ufw allow 22/tcp
sudo ufw enable

# Check status
sudo ufw status
```

### 2. SSH Hardening
```bash
# Disable password authentication (use SSH keys)
sudo nano /etc/ssh/sshd_config
# Set: PasswordAuthentication no
# Set: PermitRootLogin no

# Restart SSH
sudo systemctl restart ssh
```

### 3. Keep System Updated
```bash
# Auto-updates (Ubuntu/Debian)
sudo apt-get install unattended-upgrades
sudo dpkg-reconfigure --priority=low unattended-upgrades

# Manual updates
sudo apt-get update && sudo apt-get upgrade -y
```

### 4. Docker Security
```bash
# Run containers as non-root (already configured in Dockerfile)
# Use read-only filesystems where possible
# Limit container resources

# Scan images for vulnerabilities
docker scan ghcr.io/blackout-industries/web:latest
```

### 5. Secrets Management
```bash
# Never commit .env.prod to git
# Store in secure location
# Backup encrypted tunnel credentials

# Backup tunnel config
cp ~/.cloudflared/*.json ~/backups/
gpg -c ~/backups/*.json  # Encrypt with password
```

### 6. Cloudflare Security Settings

In Cloudflare dashboard:
- Enable "Under Attack Mode" if experiencing DDoS
- Configure Firewall Rules (block countries, IPs)
- Enable Bot Fight Mode (free tier)
- Set up Page Rules for caching
- Enable DNSSEC
- Use Cloudflare Access for admin pages (if needed)

---

## Backup & Restore

### Backup Tunnel Configuration

```bash
# Backup tunnel credentials
mkdir -p ~/backups/cloudflare
cp ~/.cloudflared/*.json ~/backups/cloudflare/
cp ~/.cloudflared/config.yml ~/backups/cloudflare/
cp .env.prod ~/backups/cloudflare/

# Create encrypted archive
tar -czf cloudflare-tunnel-backup.tar.gz ~/backups/cloudflare/
gpg -c cloudflare-tunnel-backup.tar.gz  # Encrypt with password
rm cloudflare-tunnel-backup.tar.gz  # Remove unencrypted version

# Store encrypted backup securely (e.g., external drive, cloud storage)
```

### Restore from Backup

```bash
# Decrypt and extract
gpg -d cloudflare-tunnel-backup.tar.gz.gpg > cloudflare-tunnel-backup.tar.gz
tar -xzf cloudflare-tunnel-backup.tar.gz

# Restore credentials
cp ~/backups/cloudflare/*.json ~/.cloudflared/
cp ~/backups/cloudflare/config.yml ~/.cloudflared/
cp ~/backups/cloudflare/.env.prod ./

# Start services
docker-compose -f deploy/docker-compose.prod.yml --env-file .env.prod up -d
```

---

## Performance Optimization

### 1. Cloudflare Caching

Configure caching in Cloudflare dashboard:
- **Page Rules** → Create rule for `*blackout-industries.com/*`
  - Cache Level: Standard
  - Browser Cache TTL: 4 hours
  - Edge Cache TTL: 1 day

### 2. Raspberry Pi Optimization

```bash
# Increase swap (if needed)
sudo dphys-swapfile swapoff
sudo nano /etc/dphys-swapfile
# Set: CONF_SWAPSIZE=2048
sudo dphys-swapfile setup
sudo dphys-swapfile swapon

# Enable memory cgroup (if not enabled)
sudo nano /boot/cmdline.txt
# Add: cgroup_enable=memory cgroup_memory=1

# Reboot
sudo reboot
```

### 3. Docker Resource Limits

Edit `docker-compose.prod.yml`:
```yaml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 512M
        reservations:
          memory: 256M
```

---

## Disaster Recovery

### Scenario: Raspberry Pi Hardware Failure

**Preparation:**
1. Maintain encrypted backups of tunnel credentials
2. Document tunnel ID and configuration
3. Keep `.env.prod` backup securely

**Recovery Steps:**
1. Setup new Raspberry Pi with Docker
2. Restore tunnel credentials from backup
3. Deploy using same `docker-compose.prod.yml`
4. Tunnel automatically reconnects (same tunnel ID)

**Time to Recovery:** ~30 minutes

### Scenario: Accidental Tunnel Deletion

If tunnel deleted from Cloudflare dashboard:
1. Run `./setup-cloudflare-tunnel.sh` again
2. Update `.env.prod` with new tunnel token
3. Restart services

DNS may take a few minutes to propagate.

---

## Cost Analysis

### Monthly Costs

| Component | Cost |
|-----------|------|
| Raspberry Pi 4 (4GB) | $55 (one-time) |
| Power consumption (~5W × 730h × $0.12/kWh) | ~$0.44/month |
| Internet (assumed existing) | $0 |
| Cloudflare Tunnel | **FREE** |
| Cloudflare DNS/CDN | **FREE** |
| Domain registration | ~$12/year |

**Total Operating Cost:** < $1/month + domain

Compare to:
- VPS: $5-20/month
- Managed hosting: $10-50/month
- Serverless: Pay-per-request

**ROI:** Pi pays for itself in 3-4 months vs. cheapest VPS!

---

## Alternative Deployments

### Option 2: Docker Swarm (Multi-Pi HA)

For high availability with multiple Raspberry Pis:
- Setup Docker Swarm cluster
- Deploy stack with replicas
- Use load balancing across Pis
- Automatic failover

**Guide:** See `deploy/swarm-setup.md` (TODO)

### Option 3: Kubernetes (K3s)

For learning/advanced users:
- K3s (lightweight Kubernetes)
- Helm charts for deployment
- Advanced orchestration

**Guide:** See `deploy/k3s-setup.md` (TODO)

---

## Support & Resources

### Documentation
- [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
- [Raspberry Pi Docs](https://www.raspberrypi.com/documentation/)

### Troubleshooting
- Check workflow logs: https://github.com/Blackout-Industries/web/actions
- Review Docker logs: `docker-compose logs`
- Cloudflare status: https://www.cloudflarestatus.com/

### Community
- Docker Community: https://forums.docker.com/
- Cloudflare Community: https://community.cloudflare.com/
- Raspberry Pi Forums: https://forums.raspberrypi.com/

---

## Appendix

### A. Sample Firewall Rules

**UFW (Uncomplicated Firewall):**
```bash
# Allow SSH only (no web ports needed)
sudo ufw allow 22/tcp
sudo ufw enable
```

### B. Monitoring Script

```bash
#!/bin/bash
# monitor.sh - Quick health check

echo "🔍 System Health Check"
echo "======================"
echo ""
echo "📊 CPU & Memory:"
top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print "CPU Usage: " 100 - $1 "%"}'
free -h | awk '/^Mem/ {print "Memory Usage: " $3 "/" $2}'
echo ""
echo "🐳 Docker Containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.RunningFor}}"
echo ""
echo "🚇 Tunnel Status:"
docker exec cloudflared-tunnel cloudflared tunnel info 2>&1 | grep -E "status|connections"
echo ""
echo "🌐 Website Status:"
curl -sI https://blackout-industries.com | head -n 1
```

### C. Deployment Checklist

- [ ] Raspberry Pi setup complete
- [ ] Docker & Docker Compose installed
- [ ] Cloudflare account created
- [ ] Domain added to Cloudflare
- [ ] Tunnel created and configured
- [ ] DNS records created (proxied)
- [ ] `.env.prod` file created
- [ ] Docker Compose services started
- [ ] Website accessible via HTTPS
- [ ] SSL certificate valid (auto from Cloudflare)
- [ ] Tunnel credentials backed up
- [ ] Monitoring configured
- [ ] Auto-updates enabled (if desired)

---

**Deployment Status:** ✅ Production-Ready
**Last Updated:** 2025-10-14
**Maintainer:** Blackout Industries s.r.o.
