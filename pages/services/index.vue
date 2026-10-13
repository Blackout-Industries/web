<template>
  <div>
    <PageHero
      title="Services Built for"
      highlight="Modern Teams"
      subtitle="From cloud infrastructure to smart homes, our own games to precision 3D printing - we deliver expertise at scale."
    />

    <PageSection :alt="true">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <div class="md:col-span-2">
          <ServiceCard
            icon="heroicons:building-office-2"
            title="Developer Platform"
            description="SaaS product. Internal developer platform as a service. Backstage in front, Crossplane underneath, GitOps in between; we operate it, you own the resources."
            link="/services/developer-platform"
            :features="[
              'Software catalog with ownership and docs',
              'Golden-path templates for new services',
              'Self-service databases, clusters and queues',
              'Argo CD and Kargo promotion pipelines',
              'Kyverno guardrails and signed images',
              'Azure AKS and Oracle OKE from one control plane'
            ]"
          />
        </div>

        <ServiceCard
          icon="mdi:cloud-outline"
          title="DevOps & Platform Engineering"
          description="Build infrastructure that scales with your ambitions. Expert guidance for cloud-native architectures, container orchestration, and automated deployment pipelines."
          link="/services/devops-consulting"
          :features="[
            'Cloud infrastructure (AWS, GCP, Azure)',
            'Kubernetes & container orchestration',
            'CI/CD pipeline design & automation',
            'Infrastructure as Code (Terraform CDK, Crossplane)',
            'Monitoring & observability setup',
            'Security best practices & compliance'
          ]"
        />

        <ServiceCard
          icon="mdi:cube-outline"
          title="3D Printing Services"
          description="Turn digital designs into physical reality. Rapid prototyping, custom manufacturing, and CAD optimization for your next project."
          link="/services/3d-printing"
          :features="[
            'Rapid prototyping for concept validation',
            'Custom part manufacturing',
            'CAD model optimization for printability',
            'Material selection consulting',
            'Post-processing & finishing',
            'Multi-material & multi-color printing'
          ]"
        />

        <ServiceCard
          icon="heroicons:home-modern"
          title="IoT & Home Automation"
          description="Smart home solutions and IoT systems that actually work. From concept to deployment, we build intelligent automation that integrates seamlessly with your life."
          link="/services/iot-home-automation"
          :coming-soon="true"
          :features="[
            'Smart lighting & climate control',
            'Security systems & monitoring',
            'Multi-room audio integration',
            'Energy monitoring & optimization',
            'Custom sensor development',
            'Privacy-first architecture'
          ]"
        />

        <ServiceCard
          icon="heroicons:puzzle-piece"
          title="Game Development"
          description="Our own Windows and Linux games, designed for handheld PCs and Nintendo Switch. Performance, battery and input are tuned on the device, not on a spec sheet."
          link="/services/game-development"
          :features="[
            'Handheld-first design for Steam Deck, ROG Ally and Legion Go',
            'Windows and Linux builds, native or Proton',
            'Built to Deck Verified criteria',
            'Nintendo Switch within platform budgets',
            'Frame pacing, battery and thermal budgets',
            'CI pipelines for every build'
          ]"
        />
      </div>
    </PageSection>

    <PageSection
      title="How We"
      highlight="Work"
      subtitle="Our proven process ensures smooth delivery from discovery to ongoing support."
    >
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
        <div v-for="(step, index) in steps" :key="step.title" class="card">
          <div class="icon-tile font-mono font-bold mb-4">{{ index + 1 }}</div>
          <h3 class="text-lg font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-text-secondary">{{ step.description }}</p>
        </div>
      </div>
    </PageSection>

    <PageSection :alt="true">
      <div class="card max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">Let's Discuss Your Project</h2>
        <p class="text-text-secondary mb-6">
          Schedule a consultation to explore how we can help you succeed.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary">Get in Touch</NuxtLink>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Services - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'DevOps consulting, platform engineering, IoT/home automation and 3D printing services, plus games we develop for handheld PCs and Nintendo Switch. From Kubernetes to smart homes - we deliver precision at scale.'
    }
  ]
})

const steps = [
  { title: 'Discover', description: 'Understand your needs, challenges, and goals.' },
  { title: 'Design', description: 'Architect the solution with best practices.' },
  { title: 'Deliver', description: 'Implement with precision and attention to detail.' },
  { title: 'Support', description: 'Maintain and optimize for continuous improvement.' }
]
</script>
