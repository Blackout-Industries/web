<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark opacity-90"></div>
      <div class="absolute inset-0 animated-gradient opacity-10"></div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Let's Build
            <span class="gradient-text block mt-2">Something Great</span>
          </h1>
          <p class="text-xl md:text-2xl text-text-secondary">
            Tell us about your project—we'll get back within 24 hours.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Form & Info -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <!-- Form -->
          <div class="card">
            <h2 class="text-2xl md:text-3xl font-bold mb-6">Send Us a Message</h2>
            <ContactForm />
          </div>

          <!-- Contact Info -->
          <div>
            <div class="card mb-6">
              <h3 class="text-xl font-bold mb-4">Get in Touch</h3>
              <div class="space-y-4">
                <div class="flex items-start space-x-3">
                  <Icon name="mdi:email" class="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p class="font-medium text-text-primary">Email</p>
                    <a href="mailto:offers.blackout.industries@proton.me" class="text-text-secondary hover:text-primary transition-colors">
                      offers.blackout.industries@proton.me
                    </a>
                  </div>
                </div>

                <div class="flex items-start space-x-3">
                  <Icon name="mdi:clock" class="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <p class="font-medium text-text-primary">Response Time</p>
                    <p class="text-text-secondary">Within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-6">
              <h3 class="text-xl font-bold mb-4">Connect With Us</h3>
              <div class="flex space-x-4">
                <a
                  href="https://github.com/blackoutindustries"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-12 h-12 bg-dark-200 hover:bg-dark-300 border border-dark-300 hover:border-primary rounded-lg transition-all hover:scale-110"
                  aria-label="GitHub"
                >
                  <Icon name="mdi:github" class="w-6 h-6 text-text-secondary hover:text-primary" />
                </a>
                <a
                  href="https://linkedin.com/company/blackout-industries"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-center w-12 h-12 bg-dark-200 hover:bg-dark-300 border border-dark-300 hover:border-primary rounded-lg transition-all hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Icon name="mdi:linkedin" class="w-6 h-6 text-text-secondary hover:text-primary" />
                </a>
              </div>
            </div>

            <div class="card bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <div class="flex items-start space-x-3">
                <Icon name="mdi:information" class="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 class="font-bold text-text-primary mb-2">What to Include</h3>
                  <ul class="space-y-2 text-sm text-text-secondary">
                    <li class="flex items-start space-x-2">
                      <Icon name="mdi:check" class="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>Brief overview of your project or challenge</span>
                    </li>
                    <li class="flex items-start space-x-2">
                      <Icon name="mdi:check" class="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>Timeline and budget constraints (if any)</span>
                    </li>
                    <li class="flex items-start space-x-2">
                      <Icon name="mdi:check" class="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>Any specific requirements or questions</span>
                    </li>
                    <li class="flex items-start space-x-2">
                      <Icon name="mdi:check" class="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                      <span>Best way to reach you</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ / Quick Questions -->
    <section class="section">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Quick <span class="gradient-text">Questions?</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div class="card">
            <h3 class="text-lg font-bold mb-2 flex items-center space-x-2">
              <Icon name="mdi:help-circle" class="w-5 h-5 text-primary" />
              <span>What services do you offer?</span>
            </h3>
            <p class="text-text-secondary text-sm">
              We specialize in DevOps consulting, platform engineering, and 3D printing services. Check out our <NuxtLink to="/services" class="text-primary hover:text-primary-light">services page</NuxtLink> for details.
            </p>
          </div>

          <div class="card">
            <h3 class="text-lg font-bold mb-2 flex items-center space-x-2">
              <Icon name="mdi:help-circle" class="w-5 h-5 text-primary" />
              <span>How long does a typical project take?</span>
            </h3>
            <p class="text-text-secondary text-sm">
              Project timelines vary based on scope. DevOps engagements typically range from 2-12 weeks. 3D printing prototypes can be delivered in 2-5 days.
            </p>
          </div>

          <div class="card">
            <h3 class="text-lg font-bold mb-2 flex items-center space-x-2">
              <Icon name="mdi:help-circle" class="w-5 h-5 text-primary" />
              <span>Do you work with startups?</span>
            </h3>
            <p class="text-text-secondary text-sm">
              Absolutely! We work with organizations of all sizes, from early-stage startups to established enterprises. Our approach scales to your needs and budget.
            </p>
          </div>

          <div class="card">
            <h3 class="text-lg font-bold mb-2 flex items-center space-x-2">
              <Icon name="mdi:help-circle" class="w-5 h-5 text-primary" />
              <span>What's your pricing structure?</span>
            </h3>
            <p class="text-text-secondary text-sm">
              We offer project-based pricing and hourly consulting rates. Contact us for a detailed quote based on your specific requirements.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Contact - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with Blackout Industries. Tell us about your DevOps, platform engineering, or 3D printing project. We respond within 24 hours.'
    }
  ]
})
</script>
