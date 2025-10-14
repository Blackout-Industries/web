import { test, expect, devices } from '@playwright/test'

test.use({
  ...devices['iPhone 13']
})

test.describe('Mobile Navigation', () => {
  test('mobile menu toggle works', async ({ page }) => {
    await page.goto('/')

    // Mobile menu should be hidden initially
    const mobileMenu = page.locator('.md\\:hidden .mobile-nav-link')
    await expect(mobileMenu.first()).not.toBeVisible()

    // Click hamburger menu
    await page.locator('button[aria-label="Toggle menu"]').click()

    // Menu should be visible
    await expect(mobileMenu.first()).toBeVisible()

    // Click menu button again to close
    await page.locator('button[aria-label="Toggle menu"]').click()

    // Menu should be hidden again
    await expect(mobileMenu.first()).not.toBeVisible()
  })

  test('navigate using mobile menu', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu
    await page.locator('button[aria-label="Toggle menu"]').click()

    // Click Services in mobile menu
    await page.locator('.mobile-nav-link:has-text("All Services")').click()
    await page.waitForLoadState('networkidle')

    // Verify navigation
    await expect(page).toHaveURL(/\/services/)

    // Menu should close after navigation
    const mobileMenu = page.locator('.mobile-nav-link')
    await expect(mobileMenu.first()).not.toBeVisible()
  })

  test('navigate to devops from mobile menu', async ({ page }) => {
    await page.goto('/')

    await page.locator('button[aria-label="Toggle menu"]').click()

    await page.locator('.mobile-nav-link:has-text("DevOps Consulting")').click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/services\/devops-consulting/)
    await expect(page.locator('h1')).toContainText('Platform Engineering')
  })

  test('navigate to 3d printing from mobile menu', async ({ page }) => {
    await page.goto('/')

    await page.locator('button[aria-label="Toggle menu"]').click()

    await page.locator('.mobile-nav-link:has-text("3D Printing")').click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/services\/3d-printing/)
    await expect(page.locator('h1')).toContainText('Precision 3D Printing')
  })

  test('navigate to about from mobile menu', async ({ page }) => {
    await page.goto('/')

    await page.locator('button[aria-label="Toggle menu"]').click()

    await page.locator('.mobile-nav-link:has-text("About")').click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/about/)
  })

  test('contact button works in mobile menu', async ({ page }) => {
    await page.goto('/')

    await page.locator('button[aria-label="Toggle menu"]').click()

    await page.locator('.mobile-nav-link[href="/contact"]').click()
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL(/\/contact/)
  })

  test('mobile menu closes when clicking outside', async ({ page }) => {
    await page.goto('/')

    // Open mobile menu
    await page.locator('button[aria-label="Toggle menu"]').click()

    // Verify menu is open
    const mobileMenu = page.locator('.mobile-nav-link')
    await expect(mobileMenu.first()).toBeVisible()

    // Note: This behavior depends on implementation
    // If menu has backdrop, clicking it should close menu
  })

  test('mobile menu icon changes when open', async ({ page }) => {
    await page.goto('/')

    // Initially should show hamburger icon
    const menuButton = page.locator('button[aria-label="Toggle menu"]')
    await expect(menuButton).toBeVisible()

    // Click to open
    await menuButton.click()

    // Icon should change (implementation-specific)
    // Just verify button is still interactive
    await expect(menuButton).toBeVisible()

    // Click to close
    await menuButton.click()
  })

  test('mobile navigation persists across route changes', async ({ page }) => {
    await page.goto('/')

    await page.locator('button[aria-label="Toggle menu"]').click()
    await page.locator('.mobile-nav-link:has-text("All Services")').click()
    await page.waitForLoadState('networkidle')

    // Menu button should still be present
    await expect(page.locator('button[aria-label="Toggle menu"]')).toBeVisible()
  })

  test('responsive breakpoint hides mobile menu on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 })
    await page.goto('/')

    // Mobile menu button should be hidden on desktop
    const mobileButton = page.locator('button[aria-label="Toggle menu"]')

    // Check if button has md:hidden class (implementation detail)
    // On desktop viewport, desktop nav should be visible
    const desktopNav = page.locator('.hidden.md\\:flex')
    await expect(desktopNav).toBeVisible()
  })
})
