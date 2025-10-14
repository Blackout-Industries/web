#!/bin/bash
set -e

# Quick deployment script for Raspberry Pi
# Usage: ./deploy.sh [version]

VERSION=${1:-latest}

echo "🚀 Deploying Blackout Industries Website"
echo "========================================="
echo "Version: $VERSION"
echo ""

# Check if .env.prod exists
if [ ! -f .env.prod ]; then
    echo "❌ Error: .env.prod not found!"
    echo ""
    echo "Please run ./setup-cloudflare-tunnel.sh first to configure Cloudflare Tunnel."
    exit 1
fi

# Load environment
source .env.prod

# Pull latest image
echo "📦 Pulling image..."
docker pull ghcr.io/blackout-industries/web:$VERSION

# Stop existing services
echo "🛑 Stopping existing services..."
docker-compose -f docker-compose.prod.yml down || true

# Start services
echo "🚀 Starting services..."
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 5

# Check status
echo ""
echo "📊 Service Status:"
docker-compose -f docker-compose.prod.yml ps

# Health checks
echo ""
echo "🔍 Health Checks:"

# Check web container
if docker exec blackout-web wget -qO- http://localhost:80 > /dev/null 2>&1; then
    echo "✅ Web container: healthy"
else
    echo "❌ Web container: unhealthy"
fi

# Check tunnel
if docker exec cloudflared-tunnel cloudflared tunnel info > /dev/null 2>&1; then
    echo "✅ Cloudflare Tunnel: connected"
else
    echo "⚠️  Cloudflare Tunnel: check logs with 'docker logs cloudflared-tunnel'"
fi

# Test external access
echo ""
echo "🌐 Testing external access..."
if curl -sI https://$DOMAIN | head -n 1 | grep -q "200\|301\|302"; then
    echo "✅ Website accessible at https://$DOMAIN"
else
    echo "⚠️  Website may not be accessible yet (DNS propagation can take a few minutes)"
fi

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Useful commands:"
echo "  View logs:     docker-compose -f docker-compose.prod.yml logs -f"
echo "  Check status:  docker-compose -f docker-compose.prod.yml ps"
echo "  Restart:       docker-compose -f docker-compose.prod.yml restart"
echo "  Stop:          docker-compose -f docker-compose.prod.yml down"
echo ""
echo "Visit your site: https://$DOMAIN"
echo ""
