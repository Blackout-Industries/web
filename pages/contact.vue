<template>
  <div>
    <PageHero
      title="Let's Build"
      highlight="Something Great"
      subtitle="Drop us a line - we'll get back within 24 hours."
    />

    <PageSection :alt="true">
      <div class="max-w-3xl space-y-6">
        <div class="card">
          <div class="flex items-center gap-4 mb-4">
            <div class="icon-tile">
              <Icon name="mdi:email-outline" class="w-5 h-5" />
            </div>
            <h2 class="text-2xl md:text-3xl font-bold">Email Us Directly</h2>
          </div>
          <p class="text-text-secondary mb-6">
            The fastest way to reach us. No forms, no friction.
          </p>
          <a
            :href="`mailto:${email}?subject=${encodeURIComponent(defaultSubject)}`"
            class="btn btn-primary inline-flex items-center gap-2 max-w-full"
          >
            <Icon name="mdi:send" class="w-5 h-5 flex-shrink-0" />
            <span class="break-all">{{ email }}</span>
          </a>
          <p class="mt-4 flex items-center gap-1 text-sm text-text-tertiary">
            <Icon name="mdi:clock-outline" class="w-4 h-4" />
            <span>We typically respond within 24 hours</span>
          </p>
        </div>

        <FeatureCard
          icon="mdi:information"
          title="What to Include"
          :items="[
            'Brief overview of your project or challenge',
            'Timeline and budget constraints (if any)',
            'Any specific requirements or questions',
            'Best way to reach you'
          ]"
        />

        <div class="card">
          <h3 class="text-lg font-semibold mb-4">Connect With Us</h3>
          <div class="flex gap-4">
            <a
              href="https://github.com/Blackout-Industries"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-12 h-12 bg-dark-200 border border-dark-300 hover:border-primary rounded-lg text-text-secondary hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Icon name="mdi:github" class="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/company/blackout-industries"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center w-12 h-12 bg-dark-200 border border-dark-300 hover:border-primary rounded-lg text-text-secondary hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Icon name="mdi:linkedin" class="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </PageSection>

    <PageSection title="Quick" highlight="Questions?">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <div class="card">
          <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
            <Icon name="mdi:help-circle" class="w-5 h-5 text-primary flex-shrink-0" />
            <span>What services do you offer?</span>
          </h3>
          <p class="text-text-secondary text-sm">
            We specialize in DevOps consulting, platform engineering, and 3D printing services. Check out our <NuxtLink to="/services" class="text-primary hover:text-primary-light">services page</NuxtLink> for details.
          </p>
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
            <Icon name="mdi:help-circle" class="w-5 h-5 text-primary flex-shrink-0" />
            <span>How long does a typical project take?</span>
          </h3>
          <p class="text-text-secondary text-sm">
            Project timelines vary based on scope. DevOps engagements typically range from 2-12 weeks. 3D printing prototypes can be delivered in 2-5 days.
          </p>
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
            <Icon name="mdi:help-circle" class="w-5 h-5 text-primary flex-shrink-0" />
            <span>Do you work with startups?</span>
          </h3>
          <p class="text-text-secondary text-sm">
            Absolutely! We work with organizations of all sizes, from early-stage startups to established enterprises. Our approach scales to your needs and budget.
          </p>
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
            <Icon name="mdi:help-circle" class="w-5 h-5 text-primary flex-shrink-0" />
            <span>What's your pricing structure?</span>
          </h3>
          <p class="text-text-secondary text-sm">
            We offer project-based pricing and hourly consulting rates. Contact us for a detailed quote based on your specific requirements.
          </p>
        </div>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
const email = 'offers.blackout.industries@proton.me'
const defaultSubject = 'Project inquiry'

useHead({
  title: 'Contact - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Get in touch with Blackout Industries. Email us about your DevOps, platform engineering, or 3D printing project. We respond within 24 hours.'
    }
  ]
})
</script>
