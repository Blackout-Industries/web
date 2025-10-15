import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  if (!body.name || !body.email || !body.service || !body.message) {
    throw createError({
      statusCode: 400,
      message: 'Missing required fields'
    })
  }

  // Check honeypot
  if (body.honeypot) {
    // Silently accept but don't send email (bot protection)
    return { success: true }
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      message: 'Invalid email format'
    })
  }

  // Validate message length
  if (body.message.length < 20) {
    throw createError({
      statusCode: 400,
      message: 'Message must be at least 20 characters'
    })
  }

  try {
    // Configure nodemailer
    const config = useRuntimeConfig()

    // For static site, we'll use a mailto link approach
    // or integrate with a service like SendGrid, Mailgun, Resend, etc.

    // Option 1: Use Resend (modern, simple API)
    // Option 2: Direct SMTP (requires SMTP server)
    // Option 3: mailto link (client-side only)

    // For now, we'll create a formatted email body that can be sent
    // via external service or logged for manual processing

    const emailBody = `
New Contact Form Submission
============================

From: ${body.name}
Email: ${body.email}
Company: ${body.company || 'N/A'}
Service Interest: ${body.service}

Message:
${body.message}

----
Submitted at: ${new Date().toISOString()}
    `.trim()

    // Check if SMTP credentials are configured
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = process.env.SMTP_PORT || '587'
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const emailTo = process.env.CONTACT_EMAIL_TO || 'offers.blackout.industries@proton.me'

    if (smtpHost && smtpUser && smtpPass) {
      // Send via SMTP
      const transporter = nodemailer.createTransporter({
        host: smtpHost,
        port: parseInt(smtpPort),
        secure: smtpPort === '465',
        auth: {
          user: smtpUser,
          pass: smtpPass
        }
      })

      await transporter.sendMail({
        from: `"Blackout Industries Contact Form" <${smtpUser}>`,
        to: emailTo,
        replyTo: body.email,
        subject: `New Contact: ${body.name} - ${body.service}`,
        text: emailBody,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${body.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${body.email}">${body.email}</a></p>
          <p><strong>Company:</strong> ${body.company || 'N/A'}</p>
          <p><strong>Service Interest:</strong> ${body.service}</p>
          <h3>Message:</h3>
          <p>${body.message.replace(/\n/g, '<br>')}</p>
          <hr>
          <p><small>Submitted at: ${new Date().toISOString()}</small></p>
        `
      })

      console.log(`[Contact Form] Email sent successfully to ${emailTo}`)
      return { success: true }
    } else {
      // Fallback: Log to console for manual processing
      console.log('[Contact Form] SMTP not configured. Email would be:')
      console.log(emailBody)
      console.log('\nTo enable email sending, configure these environment variables:')
      console.log('- SMTP_HOST')
      console.log('- SMTP_PORT (default: 587)')
      console.log('- SMTP_USER')
      console.log('- SMTP_PASS')
      console.log('- CONTACT_EMAIL_TO (default: offers.blackout.industries@proton.me)')

      // Still return success to not confuse users
      return {
        success: true,
        note: 'Contact form submission received. Email functionality requires SMTP configuration.'
      }
    }
  } catch (error: any) {
    console.error('[Contact Form] Error:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to send message. Please try again or email us directly.'
    })
  }
})
