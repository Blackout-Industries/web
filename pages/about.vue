<template>
  <div>
    <PageHero
      title="Built by Engineers,"
      highlight="for Engineers"
      subtitle="Blackout Industries combines software expertise with physical manufacturing."
    />

    <PageSection :alt="true">
      <div class="max-w-3xl space-y-12">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
          <p class="text-text-secondary text-lg leading-relaxed mb-4">
            Founded in May 2023, Blackout Industries s.r.o was born from a simple observation: too many organizations were trapped in legacy on-premise infrastructure, struggling with manual deployments, skyrocketing cloud costs, and systems that couldn't scale with their ambitions.
          </p>
          <p class="text-text-secondary text-lg leading-relaxed">
            With over 10 years of hands-on DevOps and infrastructure engineering experience, transforming enterprise systems and delivering cloud-native solutions across Azure, AWS, and Oracle Cloud, we saw an opportunity to help teams ditch the chaos and embrace modern, resilient infrastructure. At the same time, we recognized the power of rapid prototyping through 3D printing - turning digital concepts into physical prototypes in hours, not weeks.
          </p>
        </div>

        <div>
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
          <p class="text-text-secondary text-lg leading-relaxed">
            We help teams build better, faster. Whether it's migrating from on-premise to cloud-native architectures, designing GitOps workflows with ArgoCD and Helm, or creating custom 3D-printed components, we bring battle-tested expertise and pragmatic problem-solving to every engagement. We believe in automation, observability, security-first design, and delivering measurable value - not just checking boxes.
          </p>
        </div>
      </div>
    </PageSection>

    <PageSection title="Our" highlight="Expertise">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <FeatureCard
          v-for="area in expertise"
          :key="area.title"
          :icon="area.icon"
          :title="area.title"
          :items="area.items"
        />
      </div>
    </PageSection>

    <PageSection :alt="true">
      <div class="max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">Our Approach</h2>
        <p class="text-text-secondary text-lg leading-relaxed mb-4">
          We don't believe in one-size-fits-all solutions or following trends blindly. Every engagement starts with understanding your constraints, your team's capabilities, and your business goals. Then we architect solutions that fit your unique context - whether that's a full cloud migration, CI/CD pipeline overhaul, or iterative infrastructure improvements.
        </p>
        <p class="text-text-secondary text-lg leading-relaxed">
          With a decade of experience across enterprise projects, multi-platform deployments, and complex multi-cloud environments, we bring real-world expertise and lessons learned. Technical rigor meets creative problem-solving - that's the Blackout Industries way.
        </p>
      </div>
    </PageSection>

    <PageSection title="Our" highlight="Values">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <FeatureCard
          v-for="value in values"
          :key="value.title"
          :icon="value.icon"
          :title="value.title"
          :description="value.description"
        />
      </div>
    </PageSection>

    <PageSection :alt="true">
      <div class="card max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">Let's Work Together</h2>
        <p class="text-text-secondary mb-6">
          Ready to build something great? We'd love to hear about your project.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary">Get in Touch</NuxtLink>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'About - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Built by engineers, for engineers. Learn about Blackout Industries\' mission to help teams build better, faster with DevOps consulting and 3D printing services.'
    }
  ]
})

const expertise = [
  {
    icon: 'heroicons:cloud',
    title: 'Cloud & Infrastructure',
    items: [
      'Multi-cloud architecture (Azure, AWS, OCI, GCP)',
      'Container orchestration & service mesh',
      'API gateways & edge networking',
      'Managed databases & data platforms',
      'Secrets management & encryption'
    ]
  },
  {
    icon: 'heroicons:bolt',
    title: 'Automation & DevOps',
    items: [
      'GitOps workflows & declarative deployments',
      'CI/CD pipeline design & optimization',
      'Infrastructure as Code across platforms',
      'Event-driven autoscaling & serverless',
      'Policy enforcement & compliance automation'
    ]
  },
  {
    icon: 'heroicons:chart-bar',
    title: 'Observability & Data',
    items: [
      'Metrics, logs, traces & alerting systems',
      'Database clustering & high availability',
      'Schema migration strategies',
      'Custom automation & integrations'
    ]
  },
  {
    icon: 'heroicons:shield-check',
    title: 'Security & Quality',
    items: [
      'Code quality gates & static analysis',
      'Security scanning & vulnerability management',
      'Automated testing & end-to-end validation',
      'Multi-platform delivery pipelines'
    ]
  }
]

const values = [
  {
    icon: 'heroicons:sparkles',
    title: 'Technical Excellence',
    description: 'We hold ourselves to the highest standards of quality and craftsmanship.'
  },
  {
    icon: 'heroicons:rocket-launch',
    title: 'Client Success',
    description: 'Your success is our success. We measure our impact by the results you achieve.'
  },
  {
    icon: 'heroicons:academic-cap',
    title: 'Continuous Learning',
    description: 'Technology evolves fast. We stay at the forefront through constant learning.'
  },
  {
    icon: 'heroicons:chat-bubble-left-right',
    title: 'Transparent Communication',
    description: 'Clear, honest communication builds trust and drives better outcomes.'
  }
]
</script>
