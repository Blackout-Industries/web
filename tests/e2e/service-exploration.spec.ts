import { test, expect } from '@playwright/test'

test.describe('Service Exploration Journey', () => {
  test('complete user journey: home to tech stack to devops', async ({ page }) => {
    // Start on home page
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Engineering Infrastructure')

    // Scroll down to see tech stack
    await page.locator('.tech-stack').scrollIntoViewIfNeeded()

    // Verify tech stack is visible
    await expect(page.locator('.tech-item').first()).toBeVisible()

    // Tech stack should show multiple technologies
    const techItems = page.locator('.tech-item')
    await expect(techItems).toHaveCount(18)

    // Click on services section
    await page.locator('#services').scrollIntoViewIfNeeded()

    // Click DevOps service card
    await page.locator('a[href="/services/devops-consulting"]').first().click()
    await page.waitForLoadState('networkidle')

    // Verify on DevOps page
    await expect(page).toHaveURL(/\/services\/devops-consulting/)
    await expect(page.locator('h1')).toContainText('Platform Engineering')
  })

  test('explore devops page content thoroughly', async ({ page }) => {
    await page.goto('/services/devops-consulting')

    // Verify hero section
    await expect(page.locator('h1')).toContainText('Platform Engineering')

    // Scroll to pain points section
    await page.locator('text=Challenges We').scrollIntoViewIfNeeded()

    // Verify pain points are visible
    await expect(page.locator('text=Slow Deployment Cycles')).toBeVisible()
    await expect(page.locator('text=Cloud Cost Overruns')).toBeVisible()
    await expect(page.locator('text=Lack of Observability')).toBeVisible()
    await expect(page.locator('text=Manual, Error-Prone Processes')).toBeVisible()

    // Scroll to expertise section
    await page.locator('text=Our').scrollIntoViewIfNeeded()

    // Verify service categories exist
    const serviceCards = page.locator('.card')
    await expect(serviceCards.first()).toBeVisible()

    // Scroll to bottom to see CTA
    await page.locator('footer').scrollIntoViewIfNeeded()
  })

  test('explore 3d printing page content', async ({ page }) => {
    await page.goto('/services/3d-printing')

    // Verify hero
    await expect(page.locator('h1')).toContainText('Precision 3D Printing')

    // Scroll to services section
    await page.locator('text=What We').scrollIntoViewIfNeeded()

    // Verify service offerings
    await expect(page.locator('text=Rapid Prototyping')).toBeVisible()
    await expect(page.locator('text=Custom Manufacturing')).toBeVisible()

    // Verify materials are listed
    await expect(page.locator('text=PLA, PETG, ABS, TPU, Nylon, Resin')).toBeVisible()

    // Verify turnaround time information
    await expect(page.locator('text=2-5 business days')).toBeVisible()
  })

  test('navigate between service pages', async ({ page }) => {
    // Start on services overview
    await page.goto('/services')

    await expect(page.locator('h1')).toContainText('Services Built for')

    // Navigate to DevOps
    await page.locator('a[href="/services/devops-consulting"]').first().click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/services\/devops-consulting/)

    // Use header to go back to services overview
    await page.locator('button:has-text("Services")').hover()
    await page.waitForTimeout(300)

    await page.locator('a[href="/services"]').first().click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/services$/)

    // Navigate to 3D Printing
    await page.locator('a[href="/services/3d-printing"]').first().click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/services\/3d-printing/)
  })

  test('scroll behavior and content visibility', async ({ page }) => {
    await page.goto('/')

    // Verify scroll indicator is visible
    await expect(page.locator('.animate-bounce')).toBeVisible()

    // Scroll down
    await page.locator('#services').scrollIntoViewIfNeeded()

    // Service cards should be visible after scroll
    await expect(page.locator('.service-card').first()).toBeVisible()

    // Continue scrolling to tech stack
    await page.evaluate(() => window.scrollBy(0, 500))

    // Tech stack should be visible
    await expect(page.locator('.tech-stack')).toBeVisible()
  })

  test('CTA buttons throughout journey', async ({ page }) => {
    await page.goto('/')

    // Hero CTA
    await expect(page.locator('a:has-text("Explore Services")').first()).toBeVisible()
    await expect(page.locator('a:has-text("Get in Touch")').first()).toBeVisible()

    // Navigate to services page
    await page.goto('/services')

    // Services page CTA
    await page.locator('footer').scrollIntoViewIfNeeded()
    await expect(page.locator('a:has-text("Get in Touch")')).toBeVisible()

    // Navigate to DevOps page
    await page.goto('/services/devops-consulting')

    // DevOps page should have contact CTAs
    await page.locator('footer').scrollIntoViewIfNeeded()

    const contactLinks = page.locator('a[href="/contact"]')
    await expect(contactLinks.first()).toBeVisible()
  })

  test('return home from any page', async ({ page }) => {
    await page.goto('/services/devops-consulting')

    // Click logo to return home
    await page.locator('a[href="/"]').first().click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL('/')
    await expect(page.locator('h1')).toContainText('Engineering Infrastructure')
  })
})
