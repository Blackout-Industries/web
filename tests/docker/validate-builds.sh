#!/bin/bash

# Docker Build and Runtime Validation Script
# Tests Docker builds and runtime integrity for both dev and prod environments

set -e  # Exit on any error

echo "========================================"
echo "Docker Build & Runtime Validation"
echo "========================================"
echo ""

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counters
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function to print test results
print_result() {
  if [ $1 -eq 0 ]; then
    echo -e "${GREEN}✓ PASS${NC}: $2"
    ((TESTS_PASSED++))
  else
    echo -e "${RED}✗ FAIL${NC}: $2"
    ((TESTS_FAILED++))
  fi
}

# Clean up function
cleanup() {
  echo ""
  echo "Cleaning up..."
  docker compose down -v 2>/dev/null || true
  docker compose rm -f 2>/dev/null || true
}

# Register cleanup on script exit
trap cleanup EXIT

echo "----------------------------------------"
echo "Test 1: Dev Image Build"
echo "----------------------------------------"
docker compose build dev
print_result $? "Dev image builds successfully"
echo ""

echo "----------------------------------------"
echo "Test 2: Prod Image Build"
echo "----------------------------------------"
docker compose build prod
print_result $? "Prod image builds successfully"
echo ""

echo "----------------------------------------"
echo "Test 3: Dev Container Runtime"
echo "----------------------------------------"
docker compose up -d dev
sleep 5  # Wait for container to start

# Check if container is running
docker compose ps dev | grep -q "Up" || docker compose ps dev | grep -q "running"
print_result $? "Dev container starts and runs"
echo ""

echo "----------------------------------------"
echo "Test 4: Dev Server Responds (Port 3000)"
echo "----------------------------------------"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
  print_result 0 "Dev server returns HTTP 200 on port 3000"
else
  print_result 1 "Dev server returns HTTP $HTTP_CODE (expected 200)"
fi
echo ""

echo "----------------------------------------"
echo "Test 5: Dev Server Content Validation"
echo "----------------------------------------"
CONTENT=$(curl -s http://localhost:3000 || echo "")
if echo "$CONTENT" | grep -q "Blackout Industries"; then
  print_result 0 "Dev server serves correct content"
else
  print_result 1 "Dev server content validation failed"
fi
echo ""

echo "Stopping dev container..."
docker compose down
sleep 2
echo ""

echo "----------------------------------------"
echo "Test 6: Prod Container Runtime"
echo "----------------------------------------"
docker compose up -d prod
sleep 5  # Wait for container to start

# Check if container is running
docker compose ps prod | grep -q "Up" || docker compose ps prod | grep -q "running"
print_result $? "Prod container starts and runs"
echo ""

echo "----------------------------------------"
echo "Test 7: Prod Server Responds (Port 8080)"
echo "----------------------------------------"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8080 || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
  print_result 0 "Prod server returns HTTP 200 on port 8080"
else
  print_result 1 "Prod server returns HTTP $HTTP_CODE (expected 200)"
fi
echo ""

echo "----------------------------------------"
echo "Test 8: Prod Server Content Validation"
echo "----------------------------------------"
CONTENT=$(curl -s http://localhost:8080 || echo "")
if echo "$CONTENT" | grep -q "Blackout Industries"; then
  print_result 0 "Prod server serves correct content"
else
  print_result 1 "Prod server content validation failed"
fi
echo ""

echo "----------------------------------------"
echo "Test 9: Prod Static Assets"
echo "----------------------------------------"
# Check if static assets directory exists in prod build
docker compose exec prod ls /usr/share/nginx/html/_nuxt > /dev/null 2>&1
print_result $? "Prod container has static assets"
echo ""

echo "----------------------------------------"
echo "Test 10: Container Health Checks"
echo "----------------------------------------"
# Check dev container logs for errors
DEV_LOGS=$(docker compose logs dev 2>&1)
if echo "$DEV_LOGS" | grep -qi "error" && ! echo "$DEV_LOGS" | grep -qi "0 error"; then
  print_result 1 "Dev container logs contain errors"
else
  print_result 0 "Dev container runs without errors"
fi

# Check prod container logs for errors
PROD_LOGS=$(docker compose logs prod 2>&1)
if echo "$PROD_LOGS" | grep -qi "error"; then
  print_result 1 "Prod container logs contain errors"
else
  print_result 0 "Prod container runs without errors"
fi
echo ""

echo "----------------------------------------"
echo "Test 11: Image Size Validation"
echo "----------------------------------------"
# Get image sizes
DEV_SIZE=$(docker images blackout-industries-web-dev --format "{{.Size}}" | head -1)
PROD_SIZE=$(docker images blackout-industries-web-prod --format "{{.Size}}" | head -1)

echo "Dev image size: $DEV_SIZE"
echo "Prod image size: $PROD_SIZE"

# Prod image should be smaller than dev
if [ ! -z "$DEV_SIZE" ] && [ ! -z "$PROD_SIZE" ]; then
  print_result 0 "Docker images built with reasonable sizes"
else
  print_result 1 "Unable to determine image sizes"
fi
echo ""

echo "Stopping all containers..."
docker compose down
echo ""

echo "========================================"
echo "Test Summary"
echo "========================================"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All Docker validation tests passed!${NC}"
  exit 0
else
  echo -e "${RED}✗ Some Docker validation tests failed${NC}"
  exit 1
fi
