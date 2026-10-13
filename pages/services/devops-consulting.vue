<template>
  <div>
    <PageHero
      eyebrow="DevOps & Platform Engineering"
      title="Platform Engineering"
      highlight="That Powers Growth"
      subtitle="Build resilient, scalable infrastructure with expert guidance."
    />

    <PageSection :alt="true" title="Challenges We" highlight="Solve">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <FeatureCard
          v-for="pain in painPoints"
          :key="pain.title"
          :title="pain.title"
          :icon="pain.icon"
          :description="pain.description"
        />
      </div>
    </PageSection>

    <PageSection title="Our" highlight="Expertise">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <FeatureCard
          v-for="area in expertise"
          :key="area.title"
          :title="area.title"
          :icon="area.icon"
          :description="area.description"
          :tags="area.tags"
        />
      </div>
    </PageSection>

    <PageSection :alt="true">
      <div class="card max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">Let's Discuss Your Infrastructure Needs</h2>
        <p class="text-text-secondary mb-6">
          Schedule a consultation to explore how we can optimize your DevOps workflows.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary">Get Started</NuxtLink>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'DevOps Consulting - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Expert DevOps consulting and platform engineering services. Build resilient, scalable infrastructure with Kubernetes, CI/CD, and cloud-native architectures.'
    }
  ]
})

const painPoints = [
  {
    title: 'Slow Deployment Cycles',
    icon: 'heroicons:clock',
    description: 'Manual processes causing bottlenecks and delays'
  },
  {
    title: 'Cloud Cost Overruns',
    icon: 'heroicons:currency-dollar',
    description: 'Unoptimized infrastructure draining your budget'
  },
  {
    title: 'Lack of Observability',
    icon: 'heroicons:eye-slash',
    description: 'Limited visibility into system health and performance'
  },
  {
    title: 'Manual, Error-Prone Processes',
    icon: 'heroicons:exclamation-triangle',
    description: 'Human errors causing outages and incidents'
  }
]

const expertise = [
  {
    title: 'Cloud Infrastructure Design',
    icon: 'heroicons:cloud',
    description: 'Multi-cloud or cloud-agnostic architectures tailored to your needs. We design scalable, resilient infrastructure that grows with your business while optimizing costs and performance.',
    tags: ['AWS', 'GCP', 'Azure', 'Terraform', 'Terraform CDK', 'Cloudflare']
  },
  {
    title: 'Kubernetes & Containerization',
    icon: 'lucide:container',
    description: 'Enterprise-grade orchestration, scaling, and security for containerized applications. From cluster design to production hardening, we ensure your containers run smoothly at scale.',
    tags: ['Kubernetes', 'Docker', 'Helm', 'ArgoCD', 'Istio']
  },
  {
    title: 'CI/CD Pipelines',
    icon: 'lucide:git-branch',
    description: 'Automated testing, deployment, and rollback workflows that reduce time-to-production. We build pipelines that are fast, reliable, and maintainable with comprehensive quality gates.',
    tags: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Tekton', 'CircleCI']
  },
  {
    title: 'Monitoring & Observability',
    icon: 'heroicons:chart-bar-square',
    description: "Comprehensive metrics, logs, traces, and alerting systems that provide deep insights into system health. We implement observability best practices so you know exactly what's happening in production.",
    tags: ['Prometheus', 'Grafana', 'Datadog', 'OpenTelemetry', 'ELK Stack']
  },
  {
    title: 'Security & Compliance',
    icon: 'heroicons:shield-check',
    description: 'Infrastructure security hardening, secrets management, and policy-as-code implementation. We ensure your infrastructure meets compliance standards while maintaining developer velocity.',
    tags: ['Vault', 'SOPS', 'OPA', 'Falco', 'Trivy']
  },
  {
    title: 'Networking & Service Mesh',
    icon: 'lucide:network',
    description: 'Advanced networking solutions including service mesh implementations, load balancing, and traffic management for microservices architectures.',
    tags: ['Istio', 'Linkerd', 'Envoy', 'Consul', 'NGINX']
  }
]
</script>
