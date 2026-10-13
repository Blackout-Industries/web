<template>
  <div>
    <PageHero
      eyebrow="SaaS product"
      title="Developer Platform"
      highlight="Delivered as a Service"
      subtitle="An internal developer platform built on Crossplane and Backstage. Your teams get a software catalog, golden-path templates and self-service infrastructure on Azure and Oracle Cloud. We run the platform; you keep ownership of every resource it creates."
    >
      <NuxtLink to="/contact" class="btn btn-primary">Request a Demo</NuxtLink>
      <a href="#included" class="btn btn-secondary">What's Included</a>
    </PageHero>

    <PageSection
      id="included"
      :alt="true"
      title="What's"
      highlight="Included"
      subtitle="Six building blocks, one platform. Each one is a standard open-source component we operate for you."
    >
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        <FeatureCard
          v-for="block in blocks"
          :key="block.title"
          :title="block.title"
          :icon="block.icon"
          :description="block.description"
          :items="block.items"
        />
      </div>
    </PageSection>

    <PageSection
      title="How It"
      highlight="Works"
      subtitle="Four steps from a cloud account to a working golden path."
    >
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
        <div v-for="(step, index) in steps" :key="step.title" class="card">
          <div class="icon-tile font-mono font-bold mb-4">{{ index + 1 }}</div>
          <h3 class="text-lg font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-text-secondary">{{ step.description }}</p>
        </div>
      </div>
    </PageSection>

    <PageSection :alt="true" title="Built on" highlight="Open Standards">
      <div class="card max-w-3xl">
        <p class="text-text-secondary">
          Nothing proprietary sits between your teams and your cloud. Every component is open source and runs in your subscription; if you leave, the resources and the Git history stay with you.
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="tool in standards" :key="tool" class="tag">{{ tool }}</span>
        </div>
      </div>
    </PageSection>

    <PageSection>
      <div class="card max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">A Platform Team Without the Hiring Plan</h2>
        <p class="text-text-secondary mb-6">
          Book a demo and bring one service you want on a golden path. We show it end to end.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary">Request a Demo</NuxtLink>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Developer Platform - Internal Developer Platform as a Service - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'A hosted internal developer platform built on Crossplane and Backstage: software catalog, golden-path templates and self-service infrastructure on Azure and Oracle Cloud, operated by Blackout Industries.'
    }
  ]
})

const blocks = [
  {
    title: 'Software Catalog',
    icon: 'heroicons:building-office-2',
    description: 'Every service, API, team and resource in one Backstage catalog, owned and searchable.',
    items: [
      'Ownership and on-call data on every entity',
      'TechDocs next to the code',
      'Dependency graph across services'
    ]
  },
  {
    title: 'Golden-Path Templates',
    icon: 'heroicons:document-text',
    description: 'Backstage scaffolder templates that create a repository, pipeline and runtime in one step.',
    items: [
      'New service in minutes, not days',
      'Pipelines and policies included by default',
      'Templates you can fork and extend'
    ]
  },
  {
    title: 'Self-Service Infrastructure',
    icon: 'heroicons:puzzle-piece',
    description: 'Crossplane compositions expose databases, clusters, queues and buckets as simple platform APIs.',
    items: [
      'Request a resource with a short manifest',
      'Guardrails live in the composition, not in a ticket',
      'Drift corrected continuously'
    ]
  },
  {
    title: 'GitOps Delivery',
    icon: 'lucide:git-branch',
    description: 'Argo CD applies what Git says; Kargo promotes releases through environments.',
    items: [
      'Every change is a reviewed commit',
      'Promotion from dev to prod with verification',
      'Rollback is a revert'
    ]
  },
  {
    title: 'Azure and Oracle Cloud',
    icon: 'heroicons:cloud',
    description: 'One platform across AKS and OKE, with workload identity and no stored cloud keys.',
    items: [
      'Multi-cluster from one control plane',
      'Images in ACR, mirrored to OCIR',
      'Keyless access for workloads and CI'
    ]
  },
  {
    title: 'Guardrails and Cost',
    icon: 'heroicons:shield-check',
    description: 'Kyverno policies, signed images and cost tags on everything the platform creates.',
    items: [
      'Admission policy enforced before deploy',
      'Signed and scanned images only',
      'Showback by team and environment'
    ]
  }
]

const steps = [
  {
    title: 'Connect',
    description: 'We connect your Azure or Oracle Cloud subscription and your Git organization through workload identity. No long-lived keys.'
  },
  {
    title: 'Compose',
    description: 'We model your databases, clusters and queues as Crossplane platform APIs with your naming, networking and policy rules built in.'
  },
  {
    title: 'Publish',
    description: 'Your teams get golden-path templates in Backstage. A new service arrives with its repository, pipeline and runtime.'
  },
  {
    title: 'Operate',
    description: 'We upgrade and monitor the platform. You own the resources, the Git history and the cloud accounts.'
  }
]

const standards = ['Crossplane', 'Backstage', 'Argo CD', 'Kargo', 'Kyverno', 'Terraform', 'Azure AKS', 'Oracle OKE']
</script>
