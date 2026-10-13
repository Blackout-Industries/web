<template>
  <div>
    <PageHero
      title="Engineering Infrastructure"
      highlight="That Scales"
      subtitle="K8s clusters that don't crash at 3am. Infrastructure as actual code. Games built for handhelds. Hardware that works."
    >
      <a href="#services" class="btn btn-primary">Explore Services</a>
      <NuxtLink to="/contact" class="btn btn-secondary">Get in Touch</NuxtLink>
    </PageHero>

    <PageSection
      id="services"
      :alt="true"
      title="What We"
      highlight="Actually Do"
      subtitle="No fluff. No buzzwords. Just infrastructure that survives production."
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <div class="md:col-span-2">
          <ServiceCard
            icon="heroicons:building-office-2"
            title="Developer Platform"
            description="SaaS product. Our hosted internal developer platform on Crossplane and Backstage. Catalog, golden paths and self-service infrastructure on Azure and Oracle Cloud, run by us."
            link="/services/developer-platform"
            :features="[
              'Backstage catalog and golden-path templates',
              'Crossplane self-service infrastructure',
              'GitOps delivery with Argo CD and Kargo',
              'Runs in your Azure or Oracle Cloud subscription'
            ]"
          />
        </div>

        <ServiceCard
          icon="heroicons:server-stack"
          title="DevOps Consulting"
          description="Stop firefighting. We build infrastructure that stays up when everyone else's goes down."
          link="/services/devops-consulting"
          :features="[
            'K8s that doesn\'t need babysitting',
            'GitOps pipelines that work',
            'Monitoring worth reading',
            'IaC without the regret'
          ]"
        />

        <ServiceCard
          icon="heroicons:cube-transparent"
          title="3D Printing"
          description="Hardware prototypes that actually fit on the first try. No iterations, no BS."
          link="/services/3d-printing"
          :features="[
            'Functional prototypes in days',
            'Custom manufacturing runs',
            'Models that don\'t fail mid-print',
            'Multi-material when it matters'
          ]"
        />

        <ServiceCard
          icon="heroicons:home-modern"
          title="IoT & Home Automation"
          description="Smart devices that don't phone home to China. Local-first, privacy-obsessed automation."
          link="/services/iot-home-automation"
          :coming-soon="true"
          :features="[
            'No cloud dependencies',
            'Offline-first architecture',
            'Edge compute that scales',
            'Security without subscription fees'
          ]"
        />

        <ServiceCard
          icon="heroicons:puzzle-piece"
          title="Game Development"
          description="We develop Windows and Linux games built for Steam Deck, ROG Ally, Legion Go and Nintendo Switch. Frame rate and battery budgets are set on the device from day one."
          link="/services/game-development"
          :features="[
            'Handheld-first design for Steam Deck, ROG Ally and Legion Go',
            'Native Linux and Proton builds',
            'Built to Deck Verified criteria',
            'Nintendo Switch within platform budgets'
          ]"
        />
      </div>

      <div class="mt-16 max-w-5xl">
        <div class="card bg-dark-200 border-primary/20 relative overflow-hidden">
          <div class="absolute inset-0 opacity-50 text-primary">
            <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
              <defs>
                <pattern id="tactical-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="40" stroke="currentColor" stroke-width="0.5" opacity="0.4" />
                  <line x1="0" y1="0" x2="40" y2="0" stroke="currentColor" stroke-width="0.5" opacity="0.4" />
                  <circle cx="0" cy="0" r="1.5" fill="currentColor" opacity="0.6" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#tactical-grid)" />
            </svg>
          </div>

          <div class="relative z-10 p-2 md:p-6">
            <div class="flex items-start gap-6">
              <div class="icon-tile">
                <Icon name="heroicons:shield-check" class="w-5 h-5" />
              </div>
              <div class="flex-1">
                <div class="flex flex-wrap items-center gap-3 mb-3">
                  <h3 class="text-2xl md:text-3xl font-bold">Defense & Classified Systems</h3>
                  <span class="badge">Restricted</span>
                </div>
                <p class="text-text-secondary text-lg mb-6">
                  NDA-covered projects for defense contractors, military systems, and things we legally can't mention on a website.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 text-sm">
                  <div v-for="item in classifiedAreas" :key="item" class="flex items-center gap-2 text-text-tertiary">
                    <div class="w-1 h-1 bg-primary rounded-full"></div>
                    <span class="font-mono">{{ item }}</span>
                  </div>
                </div>
                <NuxtLink to="/contact" class="btn btn-secondary inline-flex items-center gap-2">
                  <Icon name="heroicons:lock-closed" class="w-5 h-5" />
                  <span>Contact Us Directly</span>
                  <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageSection>

    <TechStack />

    <PageSection
      :alt="true"
      title="Why Us"
      highlight="Over Them"
      subtitle="Because we've been on-call at 3am fixing someone else's mess. We know what breaks."
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <FeatureCard
          v-for="reason in reasons"
          :key="reason.title"
          :icon="reason.icon"
          :title="reason.title"
          :description="reason.description"
        />
      </div>
    </PageSection>

    <PageSection>
      <div class="card max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">Tired of Infrastructure That Falls Over?</h2>
        <p class="text-text-secondary mb-6">
          Stop pretending YAML files are infrastructure. Let's build something that actually works.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary">Let's Talk</NuxtLink>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Blackout Industries - DevOps, IoT, Game Dev & 3D Printing',
  meta: [
    {
      name: 'description',
      content: 'K8s clusters that don\'t crash at 3am. Infrastructure as actual code. Games we develop for handheld PCs and Nintendo Switch. Hardware that works.'
    }
  ]
})

const classifiedAreas = [
  'Autonomous systems',
  'Drone infrastructure',
  'Secure telemetry',
  'Air-gapped networks'
]

const reasons = [
  {
    icon: 'heroicons:sparkles',
    title: 'Battle-Tested',
    description: 'We\'ve survived production incidents you\'ll only read about on HackerNews. Your architecture won\'t be our learning experience.'
  },
  {
    icon: 'heroicons:rocket-launch',
    title: 'Ship or Die',
    description: 'MVPs in weeks, not sprints of planning meetings. We code first, document after it works, like everyone actually does.'
  },
  {
    icon: 'heroicons:hand-raised',
    title: 'No Hand-Holding',
    description: 'We build it, document it, then hand you the keys. No vendor lock-in. No recurring "support contracts."'
  }
]
</script>
