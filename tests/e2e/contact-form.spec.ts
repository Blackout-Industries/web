import { test, expect } from '@playwright/test'

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact')
  })

  test('contact form is present', async ({ page }) => {
    await expect(page.locator('form')).toBeVisible()
    await expect(page.locator('#name')).toBeVisible()
    await expect(page.locator('#email')).toBeVisible()
    await expect(page.locator('#service')).toBeVisible()
    await expect(page.locator('#message')).toBeVisible()
  })

  test('all form fields are labeled correctly', async ({ page }) => {
    await expect(page.locator('label[for="name"]')).toContainText('Name')
    await expect(page.locator('label[for="email"]')).toContainText('Email')
    await expect(page.locator('label[for="company"]')).toContainText('Company')
    await expect(page.locator('label[for="service"]')).toContainText('Service Interest')
    await expect(page.locator('label[for="message"]')).toContainText('Message')
  })

  test('required fields are marked', async ({ page }) => {
    const requiredLabels = page.locator('label .text-primary')
    await expect(requiredLabels).toHaveCount(3)
  })

  test('fill out form with valid data', async ({ page }) => {
    await page.fill('#name', 'John Doe')
    await page.fill('#email', 'john.doe@example.com')
    await page.fill('#company', 'Acme Corp')
    await page.selectOption('#service', 'devops')
    await page.fill('#message', 'I am interested in DevOps consulting services for my infrastructure project.')

    // Verify form was filled
    await expect(page.locator('#name')).toHaveValue('John Doe')
    await expect(page.locator('#email')).toHaveValue('john.doe@example.com')
    await expect(page.locator('#company')).toHaveValue('Acme Corp')
    await expect(page.locator('#message')).toHaveValue(/interested in DevOps/)
  })

  test('submit form with valid data shows success message', async ({ page }) => {
    await page.fill('#name', 'Jane Smith')
    await page.fill('#email', 'jane@example.com')
    await page.selectOption('#service', '3d-printing')
    await page.fill('#message', 'I need custom 3D printing services for rapid prototyping of mechanical parts.')

    await page.click('button[type="submit"]')

    // Wait for success message
    await expect(page.locator('text=Message sent successfully')).toBeVisible({ timeout: 3000 })
    await expect(page.locator('text=24 hours')).toBeVisible()
  })

  test('submit button shows loading state', async ({ page }) => {
    await page.fill('#name', 'Test User')
    await page.fill('#email', 'test@example.com')
    await page.selectOption('#service', 'both')
    await page.fill('#message', 'This is a test message with enough characters to meet the minimum requirement.')

    await page.click('button[type="submit"]')

    // Loading state should appear briefly
    await expect(page.locator('text=Sending...')).toBeVisible({ timeout: 1000 })
  })

  test('email validation works', async ({ page }) => {
    await page.fill('#name', 'Test User')
    await page.fill('#email', 'invalid-email')
    await page.selectOption('#service', 'devops')
    await page.fill('#message', 'This is a test message with more than twenty characters.')

    await page.click('button[type="submit"]')

    // Browser validation should prevent submission
    const emailInput = page.locator('#email')
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage)

    expect(validationMessage).toBeTruthy()
  })

  test('message field requires minimum length', async ({ page }) => {
    await page.fill('#name', 'Test User')
    await page.fill('#email', 'test@example.com')
    await page.selectOption('#service', 'devops')
    await page.fill('#message', 'Too short')

    // Check that minlength attribute is set
    const messageField = page.locator('#message')
    const minLength = await messageField.getAttribute('minlength')

    expect(minLength).toBe('20')
  })

  test('service dropdown has all options', async ({ page }) => {
    const serviceSelect = page.locator('#service')

    // Get all options
    const options = await serviceSelect.locator('option').allTextContents()

    expect(options).toContain('Select a service...')
    expect(options).toContain('DevOps & Platform Engineering')
    expect(options).toContain('3D Printing')
    expect(options).toContain('Both Services')
    expect(options).toContain('Other')
  })

  test('company field is optional', async ({ page }) => {
    await page.fill('#name', 'John Doe')
    await page.fill('#email', 'john@example.com')
    await page.selectOption('#service', 'devops')
    await page.fill('#message', 'This is a valid message with enough characters to pass validation.')

    // Leave company field empty
    await expect(page.locator('#company')).toHaveValue('')

    // Form should still submit
    await page.click('button[type="submit"]')

    // Should show success
    await expect(page.locator('text=Message sent successfully')).toBeVisible({ timeout: 3000 })
  })

  test('form resets after successful submission', async ({ page }) => {
    await page.fill('#name', 'Test User')
    await page.fill('#email', 'test@example.com')
    await page.fill('#company', 'Test Company')
    await page.selectOption('#service', 'devops')
    await page.fill('#message', 'This is a test message with enough characters.')

    await page.click('button[type="submit"]')

    // Wait for success message
    await expect(page.locator('text=Message sent successfully')).toBeVisible({ timeout: 3000 })

    // Wait a bit for form reset
    await page.waitForTimeout(1000)

    // Form fields should be cleared
    await expect(page.locator('#name')).toHaveValue('')
    await expect(page.locator('#email')).toHaveValue('')
    await expect(page.locator('#company')).toHaveValue('')
    await expect(page.locator('#message')).toHaveValue('')
  })

  test('honeypot field is hidden', async ({ page }) => {
    const honeypot = page.locator('input[name="website"]')

    await expect(honeypot).toBeHidden()
    await expect(honeypot).toHaveAttribute('tabindex', '-1')
    await expect(honeypot).toHaveAttribute('autocomplete', 'off')
  })
})
