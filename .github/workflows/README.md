# CI/CD Workflows

Automated build, test, scan, and release pipeline for Blackout Industries website.

## Workflows Overview

### 1. PR Checks (`pr-checks.yml`)

**Trigger:** Pull requests to `main` branch

**Purpose:** Validate changes before merge

**Jobs:**
- **Lint & Type Check** - Verify code quality and TypeScript types
- **Unit Tests** - Run Vitest unit tests with coverage
- **Integration Tests** - Test page-level integration
- **E2E Tests** - Playwright browser automation tests
- **Dependency Scan** - npm audit + Trivy vulnerability scanning
- **Build Validation** - Verify Nuxt build succeeds
- **Docker Build** - Test multi-stage Docker build
- **All Checks Passed** - Final gate requiring all jobs to succeed

**Concurrency:** Cancels in-progress runs when new commits pushed

**Artifacts:**
- Playwright test reports (7 days retention)
- Coverage reports uploaded to Codecov

---

### 2. Main Build & Deploy (`main-build.yml`)

**Trigger:** Push to `main` branch, manual workflow dispatch

**Purpose:** Build production artifacts and promote to staging

**Jobs:**

#### Build & Test
- Install dependencies with npm cache
- Run unit tests
- Build Nuxt application
- Generate static site
- Upload build artifacts (7 days)

#### Security Scans (Parallel Matrix)
- **SAST** - CodeQL static analysis for JavaScript/TypeScript
- **Container** - Trivy scan of Dockerfile configuration
- **Dependencies** - Trivy scan of npm dependencies
- Results uploaded to GitHub Security tab

#### Build & Push Docker Image
- Multi-stage Docker build
- Push to GitHub Container Registry (ghcr.io)
- Tags: `main-{sha}`, `latest`, `staging`
- Generate SBOM (Software Bill of Materials)
- Upload SBOM artifact (90 days)

#### Promote to Staging
- Uses GitHub environment: `staging`
- Creates deployment marker
- Posts commit comment with deployment instructions
- **Note:** Actual deployment to self-hosted infrastructure is manual

**Permissions:**
- `contents: read` - Checkout code
- `packages: write` - Push to GHCR
- `security-events: write` - Upload security scan results

**Environment Variables:**
- `REGISTRY: ghcr.io`
- `IMAGE_NAME: ${{ github.repository }}`

---

### 3. Release (`release.yml`)

**Trigger:** Git tags matching `v*.*.*` (e.g., `v1.0.0`), manual workflow dispatch

**Purpose:** Create production release with multi-platform images

**Jobs:**

#### Build Release Artifacts
- Extract version from tag or manual input
- Run full test suite
- Build Nuxt application and generate static site
- Create tarball of static build
- Generate SHA256 checksums
- Build multi-platform Docker image (`linux/amd64`, `linux/arm64`)
- Tags: `{version}`, `{major}.{minor}`, `{major}`, `stable`
- Generate comprehensive SBOM
- Create GitHub Release with:
  - Static build tarball
  - Checksums file
  - SBOM JSON
  - Auto-generated release notes

#### Deploy Production (Stub)
- Uses GitHub environment: `production`
- Prints deployment instructions
- Creates deployment record
- **Note:** No automated production deployment - manual process required

**Features:**
- Multi-platform builds for ARM and x86 architectures
- SBOM for compliance and security tracking
- Provenance attestation for supply chain security
- Image signing stub (cosign - requires setup)

---

## Security Scanning

### Tools Used

1. **CodeQL (SAST)**
   - Static Application Security Testing
   - Analyzes JavaScript/TypeScript for security vulnerabilities
   - Built-in GitHub security scanning
   - Results in Security → Code scanning alerts

2. **Trivy**
   - Container vulnerability scanning
   - Dependency vulnerability scanning
   - Dockerfile misconfiguration detection
   - Severity levels: CRITICAL, HIGH
   - Results uploaded as SARIF to GitHub Security

3. **npm audit**
   - Native npm vulnerability check
   - Audit level: HIGH
   - Continues on error (non-blocking)

### SBOM Generation

Software Bill of Materials (SBOM) generated for:
- Docker images (CycloneDX format)
- Attached to releases for compliance tracking
- Retention: 90 days for main builds, permanent for releases

---

## Container Registry

**Registry:** GitHub Container Registry (ghcr.io)

**Authentication:** Automatic via `GITHUB_TOKEN`

**Image Naming:** `ghcr.io/blackout-industries/web`

**Tag Strategy:**
- **PR builds:** Not pushed (test only)
- **Main builds:** `main-{sha}`, `latest`, `staging`
- **Releases:** `{version}`, `{major}.{minor}`, `{major}`, `stable`

**Pulling Images:**
```bash
# Latest staging build
docker pull ghcr.io/blackout-industries/web:latest

# Specific release
docker pull ghcr.io/blackout-industries/web:v1.0.0

# Stable release
docker pull ghcr.io/blackout-industries/web:stable
```

---

## Deployment Strategy

### Staging
- **Trigger:** Automatic on merge to `main`
- **Environment:** GitHub environment `staging`
- **URL:** https://staging.blackout-industries.com (placeholder)
- **Process:** Manual pull and deploy from GHCR

### Production
- **Trigger:** Manual via release tag
- **Environment:** GitHub environment `production`
- **URL:** https://blackout-industries.com
- **Process:** Self-hosted manual deployment

### Self-Hosted Deployment

After successful build/release, deploy to your infrastructure:

```bash
# Pull the image
docker pull ghcr.io/blackout-industries/web:v1.0.0

# Run container
docker run -d \
  --name blackout-web \
  -p 80:80 \
  --restart unless-stopped \
  ghcr.io/blackout-industries/web:v1.0.0

# OR use static build
wget https://github.com/Blackout-Industries/web/releases/download/v1.0.0/blackout-web-v1.0.0.tar.gz
tar -xzf blackout-web-v1.0.0.tar.gz -C /var/www/html
```

---

## Environment Configuration

### GitHub Secrets (Optional)

- `CODECOV_TOKEN` - Upload test coverage to Codecov (optional)
- `COSIGN_KEY` - Sign container images with cosign (optional, currently disabled)

### GitHub Environments

Create these in Settings → Environments:

1. **staging**
   - URL: `https://staging.blackout-industries.com`
   - Protection rules: None (auto-deploy from main)

2. **production**
   - URL: `https://blackout-industries.com`
   - Protection rules: Required reviewers (recommended)

---

## Workflow Permissions

Workflows use GitHub's automatic `GITHUB_TOKEN` with minimal required permissions:

- `contents: read` - Read repository code
- `contents: write` - Create releases (release workflow only)
- `packages: write` - Push Docker images to GHCR
- `security-events: write` - Upload security scan results

No additional secrets required for basic operation.

---

## Release Process

### Creating a Release

```bash
# Ensure main branch is ready
git checkout main
git pull origin main

# Run tests locally (optional but recommended)
npm run test:unit
npm run build

# Create and push tag
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# GitHub Actions will:
# 1. Run full test suite
# 2. Build multi-platform Docker images
# 3. Create GitHub Release with artifacts
# 4. Print production deployment instructions
```

### Versioning Strategy

Follow Semantic Versioning (SemVer):

- `v1.0.0` - Major release (breaking changes)
- `v1.1.0` - Minor release (new features, backwards compatible)
- `v1.1.1` - Patch release (bug fixes)

---

## Monitoring & Alerts

### GitHub Actions Tab
- Monitor workflow runs
- View build logs
- Download artifacts

### Security Tab
- Code scanning alerts (CodeQL)
- Dependency alerts (Trivy, Dependabot)
- SARIF upload results

### Deployments Tab
- View staging/production deployment history
- Environment status

---

## Troubleshooting

### Failed PR Checks

Check the specific job that failed:
- **Type Check:** Run `npx nuxi typecheck` locally
- **Tests:** Run `npm run test:unit` or `npm run test:e2e`
- **Build:** Run `npm run build` locally
- **Docker:** Run `docker build -t test .`

### Security Scan Failures

- Review Security tab for specific vulnerabilities
- Update dependencies: `npm audit fix`
- Check Dockerfile for misconfigurations
- CRITICAL/HIGH findings block the pipeline

### Image Push Failures

- Verify GHCR permissions in package settings
- Check `GITHUB_TOKEN` has `packages: write` scope
- Ensure repository visibility allows package publishing

### Manual Workflow Dispatch

Trigger workflows manually from Actions tab:
- Click workflow name
- Click "Run workflow"
- Select branch and input parameters (if any)

---

## Performance Optimizations

- **Caching:** npm dependencies cached via `actions/setup-node`
- **Docker BuildKit:** Layer caching via `cache-from: type=gha`
- **Concurrency:** PR workflow cancels outdated runs
- **Parallel Jobs:** Security scans run in matrix strategy
- **Incremental Builds:** Docker multi-stage builds minimize layers

---

## Future Enhancements

- [ ] Automated deployment to self-hosted infrastructure
- [ ] Container image signing with cosign
- [ ] Snyk integration for enhanced dependency scanning
- [ ] Performance regression testing
- [ ] Lighthouse CI for automated performance checks
- [ ] Slack/Discord notifications on deployment
- [ ] Blue/green deployment strategy
- [ ] Rollback automation

---

## References

- [GitHub Actions Documentation](https://docs.github.com/actions)
- [Docker Build Push Action](https://github.com/docker/build-push-action)
- [Trivy Security Scanner](https://github.com/aquasecurity/trivy)
- [CodeQL Analysis](https://codeql.github.com/)
- [GHCR Documentation](https://docs.github.com/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
