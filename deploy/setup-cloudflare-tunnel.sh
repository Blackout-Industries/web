#!/bin/bash
set -e

# Cloudflare Tunnel Setup Script for Raspberry Pi
# This script helps you create and configure a Cloudflare Tunnel

echo "🚇 Cloudflare Tunnel Setup for Blackout Industries"
echo "=================================================="
echo ""

# Check prerequisites
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first:"
    echo "   curl -fsSL https://get.docker.com | sh"
    echo "   sudo usermod -aG docker $USER"
    exit 1
fi

if ! command -v jq &> /dev/null; then
    echo "⚠️  jq not found. Installing..."
    sudo apt-get update && sudo apt-get install -y jq
fi

# Login to Cloudflare
echo ""
echo "📝 Step 1: Cloudflare Authentication"
echo "======================================"
echo ""
echo "Please login to Cloudflare:"
docker run --rm -it cloudflare/cloudflared:latest tunnel login

# Create tunnel
echo ""
echo "🚇 Step 2: Create Tunnel"
echo "========================"
echo ""
read -p "Enter tunnel name (e.g., blackout-web-prod): " TUNNEL_NAME
TUNNEL_NAME=${TUNNEL_NAME:-blackout-web-prod}

docker run --rm -v ~/.cloudflared:/root/.cloudflared cloudflare/cloudflared:latest \
    tunnel create $TUNNEL_NAME

# Get tunnel ID
TUNNEL_ID=$(docker run --rm -v ~/.cloudflared:/root/.cloudflared cloudflare/cloudflared:latest \
    tunnel list --output json | jq -r ".[0].id")

echo ""
echo "✅ Tunnel created!"
echo "   Tunnel ID: $TUNNEL_ID"
echo "   Tunnel Name: $TUNNEL_NAME"

# Configure tunnel
echo ""
echo "🔧 Step 3: Configure Tunnel"
echo "============================"
echo ""
read -p "Enter your domain (e.g., blackout-industries.com): " DOMAIN
SUBDOMAIN="www"
read -p "Enter subdomain (default: www): " SUBDOMAIN_INPUT
SUBDOMAIN=${SUBDOMAIN_INPUT:-$SUBDOMAIN}

# Create tunnel config
cat > ~/.cloudflared/config.yml <<EOF
tunnel: $TUNNEL_ID
credentials-file: /root/.cloudflared/$TUNNEL_ID.json

ingress:
  - hostname: $SUBDOMAIN.$DOMAIN
    service: http://web:80
  - hostname: $DOMAIN
    service: http://web:80
  - service: http_status:404
EOF

echo ""
echo "✅ Tunnel configuration created at ~/.cloudflared/config.yml"

# Create DNS records
echo ""
echo "🌐 Step 4: Create DNS Records"
echo "=============================="
echo ""
echo "Creating CNAME records..."

docker run --rm -v ~/.cloudflared:/root/.cloudflared cloudflare/cloudflared:latest \
    tunnel route dns $TUNNEL_NAME $SUBDOMAIN.$DOMAIN

docker run --rm -v ~/.cloudflared:/root/.cloudflared cloudflare/cloudflared:latest \
    tunnel route dns $TUNNEL_NAME $DOMAIN

echo ""
echo "✅ DNS records created!"

# Get tunnel token
echo ""
echo "🔑 Step 5: Generate Tunnel Token"
echo "================================="
echo ""

TUNNEL_TOKEN=$(docker run --rm -v ~/.cloudflared:/root/.cloudflared cloudflare/cloudflared:latest \
    tunnel token $TUNNEL_NAME)

# Create .env file
cat > .env.prod <<EOF
# Cloudflare Tunnel Configuration
CLOUDFLARE_TUNNEL_TOKEN=$TUNNEL_TOKEN
TUNNEL_ID=$TUNNEL_ID
TUNNEL_NAME=$TUNNEL_NAME
DOMAIN=$DOMAIN
EOF

echo "✅ Tunnel token saved to .env.prod"
echo ""
echo "⚠️  IMPORTANT: Keep .env.prod secure! It contains your tunnel credentials."
echo ""

# Summary
echo ""
echo "✅ Setup Complete!"
echo "=================="
echo ""
echo "Configuration Summary:"
echo "  Tunnel Name: $TUNNEL_NAME"
echo "  Tunnel ID: $TUNNEL_ID"
echo "  Domain: $DOMAIN"
echo "  Subdomain: $SUBDOMAIN.$DOMAIN"
echo ""
echo "Next steps:"
echo "  1. Review and update deploy/docker-compose.prod.yml"
echo "  2. Run: docker-compose -f deploy/docker-compose.prod.yml --env-file .env.prod up -d"
echo "  3. Visit https://$DOMAIN to verify deployment"
echo ""
echo "Tunnel credentials stored in:"
echo "  - ~/.cloudflared/config.yml"
echo "  - ~/.cloudflared/$TUNNEL_ID.json"
echo "  - .env.prod (tunnel token)"
echo ""
