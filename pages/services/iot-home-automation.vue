<template>
  <div>
    <PageHero
      eyebrow="Coming soon"
      title="IoT & Home Automation"
      subtitle="Smart home solutions and IoT systems that actually work. From concept to deployment, we build intelligent automation that integrates seamlessly with your life."
    />

    <PageSection :alt="true" title="What We" highlight="Build">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        <FeatureCard
          v-for="item in builds"
          :key="item.title"
          :title="item.title"
          :icon="item.icon"
          :description="item.description"
        />
      </div>
    </PageSection>

    <PageSection title="Technologies" highlight="We Use">
      <div class="card max-w-3xl">
        <p class="text-text-secondary">
          Open platforms and protocols first, cloud services only where they earn their place.
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="tech in technologies" :key="tech" class="tag">{{ tech }}</span>
        </div>
      </div>
    </PageSection>

    <PageSection :alt="true" title="Our" highlight="Approach">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <FeatureCard
          v-for="principle in approach"
          :key="principle.title"
          :title="principle.title"
          :icon="principle.icon"
          :description="principle.description"
        />
      </div>
    </PageSection>

    <PageSection>
      <div class="card max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">Ready to Automate Your Space?</h2>
        <p class="text-text-secondary mb-6">
          Let's discuss your smart home or IoT project. From small automation tweaks to complete system deployments.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary">Get Started</NuxtLink>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'IoT & Home Automation Services - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Smart home automation and IoT solutions. Home Assistant, custom sensors, energy monitoring, and intelligent automation that respects your privacy.'
    }
  ]
})

const builds = [
  {
    title: 'Smart Lighting',
    icon: 'heroicons:light-bulb',
    description: 'Automated lighting systems with presence detection, circadian rhythm sync, and voice control integration.'
  },
  {
    title: 'Climate Control',
    icon: 'heroicons:fire',
    description: 'Smart HVAC automation with zone control, energy optimization, and predictive scheduling.'
  },
  {
    title: 'Security Systems',
    icon: 'heroicons:lock-closed',
    description: 'Camera integration, door locks, alarm systems with real-time notifications and remote monitoring.'
  },
  {
    title: 'Multi-Room Audio',
    icon: 'heroicons:speaker-wave',
    description: 'Whole-home audio systems with synchronized playback, voice control, and streaming integration.'
  },
  {
    title: 'Energy Monitoring',
    icon: 'heroicons:bolt',
    description: 'Real-time energy tracking, solar integration, and automated optimization to reduce consumption.'
  },
  {
    title: 'Custom Sensors',
    icon: 'heroicons:wifi',
    description: 'Environmental monitoring, leak detection, air quality sensors, and custom IoT device development.'
  }
]

const technologies = [
  'Home Assistant',
  'MQTT',
  'Zigbee / Z-Wave',
  'AWS IoT Core',
  'Python / Node.js',
  'ESP32 / Arduino',
  'Node-RED',
  'InfluxDB / Grafana'
]

const approach = [
  {
    title: 'Privacy First',
    icon: 'heroicons:lock-closed',
    description: 'Local processing where possible. Your data stays in your home. No cloud dependencies unless you want them.'
  },
  {
    title: 'Open Standards',
    icon: 'heroicons:signal',
    description: "We build on open protocols (MQTT, Zigbee, Matter) so you're never locked into proprietary ecosystems."
  },
  {
    title: 'Reliable & Tested',
    icon: 'heroicons:shield-check',
    description: 'No flaky automations. Everything is tested in real-world conditions before deployment.'
  },
  {
    title: 'Easy to Maintain',
    icon: 'heroicons:wrench-screwdriver',
    description: 'Clean configuration, documentation, and training so you can manage and extend your system.'
  }
]
</script>
