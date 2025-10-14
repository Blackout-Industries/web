# Contributing Guidelines

Development guidelines and best practices for the Blackout Industries website project.

## Table of Contents

- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing Requirements](#testing-requirements)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)

## Development Workflow

### 1. Branch Strategy

```bash
# Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# Create bugfix branch
git checkout -b fix/bug-description
```

### 2. Development Process

1. Make changes in feature branch
2. Write tests for new features/fixes
3. Run all tests locally
4. Commit changes with conventional commit messages
5. Push to remote and create pull request
6. Request code review
7. Address review feedback
8. Merge to main after approval

### 3. Local Development

Use Docker for all development:

```bash
# Start development server
docker compose up dev

# Run in background
docker compose up dev -d

# View logs
docker compose logs -f dev

# Stop services
docker compose down
```

## Code Standards

### Vue/Nuxt Components

**Use Composition API with `<script setup>`:**

```vue
<script setup lang="ts">
// Good: Composition API with script setup
const props = defineProps<{
  title: string
  count?: number
}>()

const emit = defineEmits<{
  update: [value: string]
}>()

const isActive = ref(false)
</script>
```

**Component Naming:**

- PascalCase for component file names: `TheHeader.vue`, `ServiceCard.vue`
- PascalCase for component usage: `<TheHeader />`, `<ServiceCard />`
- Prefix with "The" for singleton components: `TheHeader.vue`, `TheFooter.vue`

**Props and Events:**

```typescript
// Define props with TypeScript types
const props = defineProps<{
  modelValue: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
}>()

// Define emits with payload types
const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: [data: FormData]
}>()
```

**Composables:**

- Place in `composables/` directory
- Auto-imported by Nuxt
- Prefix with `use`: `useAuth()`, `useForm()`

### CSS/Tailwind

**Use Tailwind Utility Classes:**

```vue
<!-- Good: Tailwind utilities -->
<div class="flex items-center gap-4 p-6 rounded-lg bg-black/50 backdrop-blur-sm">
  <h2 class="text-2xl font-bold text-white">Title</h2>
</div>

<!-- Avoid: Inline styles -->
<div style="display: flex; padding: 24px;">
  <h2 style="font-size: 24px;">Title</h2>
</div>
```

**Custom CSS Rules:**

- Only add custom CSS in `assets/css/main.css`
- Use for global overrides and base styles
- Prefer Tailwind `@apply` over custom classes when possible

```css
/* assets/css/main.css */
.custom-scrollbar {
  @apply scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent;
}
```

**Responsive Design:**

- Mobile-first approach: start with mobile styles, add breakpoints for larger screens
- Use Tailwind breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

```vue
<!-- Mobile first -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
    Responsive Heading
  </h1>
</div>
```

### TypeScript

**Type Safety:**

- Use TypeScript for all `.ts` and `.vue` files
- Define types for component props, emits, and composables
- Avoid `any` type - use `unknown` and type guards instead

```typescript
// Good: Explicit types
interface ServiceData {
  id: string
  title: string
  description: string
  icon: string
}

function fetchServices(): Promise<ServiceData[]> {
  // implementation
}

// Avoid: any types
function fetchServices(): Promise<any> {
  // implementation
}
```

### File Organization

```
components/
  ├── TheHeader.vue          # Singleton (prefixed with The)
  ├── TheFooter.vue
  ├── ServiceCard.vue        # Multi-instance
  ├── ContactForm.vue
  └── TechStack.vue

pages/
  ├── index.vue              # Route: /
  ├── about.vue              # Route: /about
  ├── contact.vue            # Route: /contact
  └── services/
      ├── index.vue          # Route: /services
      ├── devops-consulting.vue  # Route: /services/devops-consulting
      └── 3d-printing.vue    # Route: /services/3d-printing

tests/
  ├── unit/
  │   └── components/        # Mirror component structure
  ├── integration/
  │   └── pages/             # Mirror pages structure
  └── e2e/
      └── *.spec.ts          # User flow tests
```

## Testing Requirements

### Unit Tests

**Component Testing:**

```typescript
// tests/unit/components/ServiceCard.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ServiceCard from '~/components/ServiceCard.vue'

describe('ServiceCard', () => {
  it('renders service title', () => {
    const wrapper = mount(ServiceCard, {
      props: {
        title: 'DevOps Consulting',
        description: 'Expert guidance',
        icon: 'heroicons:server'
      }
    })

    expect(wrapper.text()).toContain('DevOps Consulting')
  })
})
```

**Coverage Target:**

- Minimum 70% overall code coverage
- 80%+ for critical business logic
- 100% for utility functions

**Run Tests:**

```bash
# Watch mode (during development)
docker compose run --rm dev npm test

# Run once (CI/CD)
docker compose run --rm dev npm run test:unit

# Coverage report
docker compose run --rm dev npm run test:coverage
```

### Integration Tests

**Page Testing:**

```typescript
// tests/integration/pages/about.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import AboutPage from '~/pages/about.vue'

describe('About Page', () => {
  it('renders company information', () => {
    const wrapper = mount(AboutPage)

    expect(wrapper.text()).toContain('Blackout Industries')
    expect(wrapper.find('h1').exists()).toBe(true)
  })
})
```

### End-to-End Tests

**User Flow Testing:**

```typescript
// tests/e2e/navigation.spec.ts
import { test, expect } from '@playwright/test'

test('navigates from home to services', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Services')

  await expect(page).toHaveURL('/services')
  await expect(page.locator('h1')).toContainText('Our Services')
})
```

**Critical Paths to Test:**

- Navigation across all pages
- Contact form submission
- Mobile menu functionality
- Service page exploration
- Performance metrics (Lighthouse)

**Run E2E Tests:**

```bash
# Start dev server first
docker compose up dev -d

# Run E2E tests
npx playwright test

# Interactive UI mode
npx playwright test --ui

# Cleanup
docker compose down
```

## Commit Conventions

### Conventional Commits Format

Use the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Commit Types

- `feat` - New feature for the user
- `fix` - Bug fix for the user
- `docs` - Documentation changes
- `style` - Code style changes (formatting, no logic changes)
- `refactor` - Code refactoring (no feature changes)
- `perf` - Performance improvements
- `test` - Adding or updating tests
- `chore` - Build process or auxiliary tool changes

### Examples

```bash
# Feature
feat(services): add 3D printing service page

# Bug fix
fix(header): mobile menu not closing on route change

# Documentation
docs: update deployment instructions for Vercel

# Test
test(contact): add E2E tests for form submission

# Refactor
refactor(components): extract shared button styles to composable

# Performance
perf(images): optimize service card images with Nuxt Image
```

### Important Rules

- **Never include references to code generation tools in commits**
- **No emojis in commit messages** (unless explicitly requested)
- Keep subject line under 72 characters
- Use imperative mood: "add feature" not "added feature"
- Capitalize first letter of subject
- No period at end of subject line
- Provide context in commit body for complex changes

## Pull Request Process

### Before Creating PR

1. Ensure all tests pass locally:

```bash
# Unit/Integration tests
docker compose run --rm dev npm run test:unit

# E2E tests
docker compose up dev -d
npx playwright test
docker compose down

# Docker builds
chmod +x tests/docker/validate-builds.sh
./tests/docker/validate-builds.sh
```

2. Check code style and formatting
3. Update documentation if needed
4. Verify no console.log statements remain
5. Ensure no hardcoded secrets or API keys

### PR Title Format

Use conventional commit format for PR titles:

```
feat: add blog post functionality
fix: resolve mobile navigation bug
docs: update contributing guidelines
```

### PR Description Template

```markdown
## Summary
Brief description of changes

## Changes Made
- List of specific changes
- Component modifications
- Test additions

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed
- [ ] Docker builds succeed

## Screenshots (if applicable)
Add screenshots for visual changes

## Breaking Changes
List any breaking changes (if applicable)

## Related Issues
Closes #123
```

### Review Process

1. Automated tests must pass (CI/CD)
2. At least one code review approval required
3. Address all review comments
4. Squash commits before merging (if multiple commits)
5. Delete branch after merge

## Docker Development

### Development Container

```bash
# Build and start
docker compose up dev --build

# Exec into container
docker compose exec dev sh

# Install new package
docker compose exec dev npm install package-name

# Rebuild after package changes
docker compose up dev --build
```

### Production Testing Locally

```bash
# Build production image
docker compose build prod

# Run production container
docker compose up prod

# Test at http://localhost:8080
```

## Common Tasks

### Adding a New Dependency

```bash
# Add dependency
docker compose exec dev npm install package-name

# Add dev dependency
docker compose exec dev npm install -D package-name

# Rebuild container
docker compose up dev --build
```

### Updating Tailwind Config

1. Edit `tailwind.config.js`
2. Changes hot-reload automatically in dev mode
3. Test responsive design on multiple screen sizes
4. Verify production build includes new classes

### Debugging

```bash
# View dev server logs
docker compose logs -f dev

# View all container logs
docker compose logs

# Inspect running container
docker compose exec dev sh
```

## Code Review Checklist

- [ ] Code follows Vue/Nuxt best practices
- [ ] Uses Composition API with `<script setup>`
- [ ] TypeScript types are properly defined
- [ ] Tailwind utilities used for styling
- [ ] Component is properly tested
- [ ] No console.log statements in code
- [ ] No hardcoded secrets or API keys
- [ ] Mobile responsive design verified
- [ ] Accessibility standards met
- [ ] Performance considerations addressed
- [ ] Documentation updated if needed

---

**Thank you for contributing to Blackout Industries website project!**
