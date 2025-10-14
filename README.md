# Blackout Industries Website

> Modern, production-ready website for Blackout Industries s.r.o - DevOps consulting, platform engineering, and precision 3D printing services.

## Overview

Static website built with Nuxt 3, featuring server-side generation (SSG) for optimal performance, dark futuristic design, and comprehensive test coverage.

**Key Features:**
- Server-side generation (SSG) for blazing-fast load times
- Dark, futuristic design with glass morphism and gradients
- Fully responsive mobile-first design
- Docker-first development and deployment workflow
- Comprehensive test suite (195+ tests: unit, integration, E2E, infrastructure)
- Production-optimized with Nginx serving static assets

## Tech Stack

- **Framework:** Nuxt 3.13+ (Vue 3 Composition API)
- **Styling:** TailwindCSS 3.4+ with custom design system
- **Icons:** Nuxt Icon (Heroicons, Lucide, Simple Icons)
- **Testing:**
  - Vitest for unit & integration tests
  - Playwright for E2E browser tests
  - Bash scripts for infrastructure validation
- **Containerization:** Docker multi-stage builds
- **Web Server:** Nginx (production)
- **Utilities:** @vueuse/nuxt, @nuxt/image

## Quick Start

### Prerequisites

- **Docker & Docker Compose** (required)
- Node.js 20+ (optional, for local development without Docker)

### Development Mode (with Hot Reload)

```bash
# Start development server
docker compose up dev

# Access at http://localhost:3000
# All changes auto-reload
```

### Production Build

```bash
# Build and run production container
docker compose up prod --build

# Access at http://localhost:8080
# Served by Nginx with optimized static assets
```

## Project Structure

```
.
├── assets/
│   └── css/
│       └── main.css          # Global styles & Tailwind config
├── components/
│   ├── TheHeader.vue         # Main navigation header
│   ├── TheFooter.vue         # Site footer with links
│   ├── ServiceCard.vue       # Service preview cards
│   ├── ContactForm.vue       # Contact form component
│   └── TechStack.vue         # Technology icons display
├── layouts/
│   └── default.vue           # Default page layout
├── pages/                    # File-based routing
│   ├── index.vue             # Home page
│   ├── services/
│   │   ├── index.vue         # Services overview
│   │   ├── devops-consulting.vue
│   │   └── 3d-printing.vue
│   ├── about.vue             # About page
│   └── contact.vue           # Contact page
├── public/                   # Static assets (favicons, images)
├── tests/
│   ├── unit/                 # Component unit tests
│   ├── integration/          # Page integration tests
│   ├── e2e/                  # End-to-end browser tests
│   └── docker/               # Infrastructure validation
├── .docs/                    # Project documentation & memory
├── Dockerfile                # Multi-stage Docker build
├── docker-compose.yml        # Dev & prod service definitions
├── nginx.conf                # Production Nginx configuration
├── nuxt.config.ts            # Nuxt framework configuration
├── tailwind.config.js        # TailwindCSS design system
├── vitest.config.ts          # Unit/integration test config
└── playwright.config.ts      # E2E test configuration
```

## Development

### Running Tests

```bash
# Unit & Integration Tests
docker compose run --rm dev npm test              # Watch mode
docker compose run --rm dev npm run test:unit     # Run once
docker compose run --rm dev npm run test:coverage # With coverage report

# End-to-End Tests (requires dev server running)
docker compose up dev -d
npx playwright test
npx playwright test --ui                          # Interactive UI mode
docker compose down

# Docker Infrastructure Tests
chmod +x tests/docker/validate-builds.sh
./tests/docker/validate-builds.sh                 # Validates all builds
```

### Adding New Pages

1. Create a `.vue` file in `pages/` directory
   - Example: `pages/blog.vue` creates `/blog` route
   - Nested: `pages/blog/post.vue` creates `/blog/post` route
2. Add navigation link in `components/TheHeader.vue`
3. Write integration tests in `tests/integration/pages/`
4. Write E2E tests in `tests/e2e/` for critical user flows

### Adding Components

1. Create a `.vue` file in `components/` directory
2. Component is auto-imported by Nuxt (no manual imports needed)
3. Write unit tests in `tests/unit/components/`
4. Use in pages: `<ComponentName />`

### Styling Guidelines

- Use Tailwind utility classes for all styling
- Custom CSS only in `assets/css/main.css` for global overrides
- Follow mobile-first responsive design (sm:, md:, lg: breakpoints)
- Dark theme colors defined in `tailwind.config.js`

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment guides covering:
- Docker self-hosted deployment
- Vercel deployment
- Netlify deployment
- Custom Nginx server setup

### Quick Docker Production Deployment

```bash
# Build production image
docker build -t blackout-web:latest --target production .

# Run container
docker run -d \
  --name blackout-web \
  -p 80:80 \
  --restart unless-stopped \
  blackout-web:latest

# Verify deployment
curl http://localhost
```

## Environment Variables

See [.env.example](./.env.example) for all configurable options.

Currently, no environment variables are required for the static site to function. Optional variables for future features:
- `FORMSPREE_ENDPOINT` - Contact form backend integration
- `GTM_ID` - Google Tag Manager for analytics

## Performance Metrics

- **Lighthouse Score:** 95+ across all metrics (Performance, Accessibility, Best Practices, SEO)
- **Bundle Size:** <72KB gzipped
- **Docker Image:** ~50MB (production)
- **Load Time:** <1s on 4G connection

## Testing Coverage

- **Unit Tests:** 40+ tests for component logic
- **Integration Tests:** 60+ tests for page rendering
- **E2E Tests:** 95+ tests for user flows
- **Docker Tests:** Infrastructure validation
- **Total Coverage:** >70% code coverage

## Design System

### Color Palette

- **Primary:** `#0EA5E9` (Cyan-blue) - Used for CTAs and accents
- **Secondary:** `#10B981` (Green) - Success states and highlights
- **Accent:** `#8B5CF6` (Purple) - Special elements
- **Background:** `#0A0A0A` (Near-black) - Main background
- **Surface:** `#1A1A1A` - Card backgrounds

### Typography

- **Font Family:** Inter (Google Fonts)
- **Headings:** 600-800 weight, large scale
- **Body:** 400-500 weight, 16px base size
- **Code:** Monospace fallback

### Components

- Glass morphism cards with `backdrop-blur` and transparency
- Gradient overlays for visual depth
- Smooth transitions and hover effects
- Consistent spacing using Tailwind's spacing scale

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines, code standards, and commit conventions.

## License

Proprietary - Copyright 2025 Blackout Industries s.r.o. All rights reserved.

## Support & Contact

- Website: [blackoutindustries.com](https://blackoutindustries.com)
- Contact Form: [/contact](/contact)
- Company: Blackout Industries s.r.o, Czech Republic

---

**Built with modern web technologies for maximum performance and developer experience.**
