import { test, expect } from '@playwright/test'

test.describe('Site Navigation', () => {
  test('navigate from home to services to devops using header', async ({ page }) => {
    await page.goto('/')

    // Verify home page loaded
    await expect(page.locator('h1')).toContainText('Engineering Infrastructure')

    // Click Services dropdown (desktop)
    await page.locator('button:has-text("Services")').hover()
    await page.waitForTimeout(300) // Wait for dropdown animation

    // Click DevOps link from dropdown
    await page.locator('a[href="/services/devops-consulting"]').first().click()
    await page.waitForLoadState('networkidle')

    // Verify DevOps page loaded
    await expect(page.locator('h1')).toContainText('Platform Engineering')
    await expect(page).toHaveURL(/\/services\/devops-consulting/)
  })

  test('navigate using service cards from home page', async ({ page }) => {
    await page.goto('/')

    // Scroll to services section
    await page.locator('#services').scrollIntoViewIfNeeded()

    // Click "Learn More" on first service card (DevOps)
    await page.locator('a[href="/services/devops-consulting"]').first().click()
    await page.waitForLoadState('networkidle')

    // Verify navigation
    await expect(page.locator('h1')).toContainText('Platform Engineering')
    await expect(page).toHaveURL(/\/services\/devops-consulting/)
  })

  test('navigate to 3D printing service', async ({ page }) => {
    await page.goto('/')

    await page.locator('#services').scrollIntoViewIfNeeded()

    // Click 3D Printing service card
    await page.locator('a[href="/services/3d-printing"]').first().click()
    await page.waitForLoadState('networkidle')

    // Verify page loaded
    await expect(page.locator('h1')).toContainText('Precision 3D Printing')
    await expect(page).toHaveURL(/\/services\/3d-printing/)
  })

  test('navigate to services overview page', async ({ page }) => {
    await page.goto('/')

    // Use header navigation
    await page.locator('button:has-text("Services")').hover()
    await page.waitForTimeout(300)

    await page.locator('a[href="/services"]').first().click()
    await page.waitForLoadState('networkidle')

    // Verify services page
    await expect(page.locator('h1')).toContainText('Services Built for')
    await expect(page).toHaveURL(/\/services$/)
  })

  test('navigate to about page', async ({ page }) => {
    await page.goto('/')

    await page.locator('a[href="/about"]').first().click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/about/)
  })

  test('navigate to contact page via header', async ({ page }) => {
    await page.goto('/')

    await page.locator('a[href="/contact"]').first().click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/contact/)
  })

  test('navigate using footer links', async ({ page }) => {
    await page.goto('/')

    // Scroll to footer
    await page.locator('footer').scrollIntoViewIfNeeded()

    // Click DevOps link in footer
    await page.locator('footer a[href="/services/devops-consulting"]').click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/services\/devops-consulting/)
  })

  test('logo navigation returns to home', async ({ page }) => {
    await page.goto('/services/devops-consulting')

    // Click logo to return home
    await page.locator('a[href="/"]').first().click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL('/')
    await expect(page.locator('h1')).toContainText('Engineering Infrastructure')
  })

  test('back button works correctly', async ({ page }) => {
    await page.goto('/')
    await page.locator('a[href="/services/devops-consulting"]').first().click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/services\/devops-consulting/)

    // Use browser back button
    await page.goBack()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL('/')
  })

  test('multiple CTA buttons navigate to contact page', async ({ page }) => {
    await page.goto('/')

    // Test hero CTA
    await page.locator('a:has-text("Get in Touch")').first().click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/contact/)
  })
})
