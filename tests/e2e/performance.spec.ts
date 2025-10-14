import { test, expect } from '@playwright/test'

test.describe('Performance and Quality Checks', () => {
  test('home page loads without console errors', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // No console errors should be present
    expect(consoleErrors).toHaveLength(0)
  })

  test('all service pages load without errors', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    // Test each service page
    const pages = [
      '/services',
      '/services/devops-consulting',
      '/services/3d-printing'
    ]

    for (const pagePath of pages) {
      await page.goto(pagePath)
      await page.waitForLoadState('networkidle')

      expect(consoleErrors).toHaveLength(0)
    }
  })

  test('images and icons load correctly', async ({ page }) => {
    await page.goto('/')

    // Wait for all images to load
    await page.waitForLoadState('networkidle')

    // Check for broken images
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const isVisible = await img.isVisible()

      if (isVisible) {
        const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth)
        expect(naturalWidth).toBeGreaterThan(0)
      }
    }
  })

  test('page load time is reasonable', async ({ page }) => {
    const startTime = Date.now()

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const loadTime = Date.now() - startTime

    // Page should load in less than 5 seconds
    expect(loadTime).toBeLessThan(5000)
  })

  test('navigation is fast between pages', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const startTime = Date.now()

    await page.locator('a[href="/services/devops-consulting"]').first().click()
    await page.waitForLoadState('networkidle')

    const navigationTime = Date.now() - startTime

    // Navigation should be quick (SSG)
    expect(navigationTime).toBeLessThan(3000)
  })

  test('no network request failures', async ({ page }) => {
    const failedRequests: string[] = []

    page.on('requestfailed', request => {
      failedRequests.push(request.url())
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // No failed requests
    expect(failedRequests).toHaveLength(0)
  })

  test('responsive images are loaded', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check that content is visible
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('.tech-stack')).toBeVisible()
  })

  test('fonts load correctly', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Check that text is rendered with proper font
    const heading = page.locator('h1')
    const fontFamily = await heading.evaluate(el => {
      return window.getComputedStyle(el).fontFamily
    })

    expect(fontFamily).toBeTruthy()
  })

  test('CSS animations work smoothly', async ({ page }) => {
    await page.goto('/')

    // Check that animated elements exist
    const animatedElements = page.locator('.animate-bounce, .animate-fade-in, .animated-gradient')
    await expect(animatedElements.first()).toBeVisible()
  })

  test('all links are valid and reachable', async ({ page }) => {
    await page.goto('/')

    // Get all internal links
    const links = page.locator('a[href^="/"]')
    const linkCount = await links.count()

    // Sample check: verify first few links are valid
    for (let i = 0; i < Math.min(linkCount, 10); i++) {
      const href = await links.nth(i).getAttribute('href')

      if (href && !href.includes('#')) {
        const response = await page.goto(href)
        expect(response?.status()).toBeLessThan(400)

        // Go back to home page
        await page.goto('/')
      }
    }
  })

  test('viewport meta tag is present', async ({ page }) => {
    await page.goto('/')

    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content')
    expect(viewportMeta).toContain('width=device-width')
  })

  test('page title is set correctly', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Blackout Industries/)

    await page.goto('/services')
    await expect(page).toHaveTitle(/Services/)

    await page.goto('/services/devops-consulting')
    await expect(page).toHaveTitle(/DevOps|Blackout/)
  })

  test('social media links are valid', async ({ page }) => {
    await page.goto('/')

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded()

    // Check social links
    const githubLink = page.locator('a[href*="github.com"]')
    const linkedinLink = page.locator('a[href*="linkedin.com"]')

    await expect(githubLink).toHaveAttribute('target', '_blank')
    await expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')

    await expect(linkedinLink).toHaveAttribute('target', '_blank')
    await expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
