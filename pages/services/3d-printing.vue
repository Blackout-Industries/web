<template>
  <div>
    <PageHero
      eyebrow="3D Printing Services"
      title="Precision 3D Printing for"
      highlight="Prototypes & Production"
      subtitle="From concept to physical product - fast, accurate, reliable."
    />

    <PageSection :alt="true" title="What We" highlight="Offer">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        <FeatureCard
          v-for="offer in offers"
          :key="offer.title"
          :title="offer.title"
          :icon="offer.icon"
          :description="offer.description"
          :items="offer.items"
          :badge="offer.badge"
        />
      </div>
    </PageSection>

    <PageSection title="Our" highlight="Technology">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
        <FeatureCard
          v-for="tech in technologies"
          :key="tech.title"
          :title="tech.title"
          :icon="tech.icon"
          :description="tech.description"
        />
      </div>
    </PageSection>

    <PageSection :alt="true" title="Common" highlight="Use Cases">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
        <FeatureCard
          v-for="useCase in useCases"
          :key="useCase.title"
          :title="useCase.title"
          :icon="useCase.icon"
          :description="useCase.description"
        />
      </div>
    </PageSection>

    <PageSection>
      <div class="card max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">Request a Quote</h2>
        <p class="text-text-secondary mb-6">
          Tell us about your project and we'll provide a detailed quote within 24 hours.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary">Get Started</NuxtLink>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: '3D Printing Services - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Professional 3D printing services for rapid prototyping and custom manufacturing. From concept to physical product with expert CAD optimization.'
    }
  ]
})

const offers = [
  {
    title: 'Rapid Prototyping',
    icon: 'heroicons:bolt',
    description: 'Quick turnaround for concept validation and iterative design support. Get your prototypes in days, not weeks. Perfect for validating designs before committing to expensive tooling.',
    items: [
      'Functional prototypes for testing and validation',
      'Iterative design refinement with fast feedback loops',
      'Fast turnaround times (2-5 business days)'
    ]
  },
  {
    title: 'Custom Manufacturing',
    icon: 'lucide:box',
    badge: 'Coming soon',
    description: 'Small to medium batch production with a wide range of materials and finishing options. From one-offs to production runs, we handle manufacturing at any scale.',
    items: [
      'Batch sizes from 1 to 1000+ units',
      'Material selection: PLA, PETG, ABS, TPU, Nylon, Resin',
      'Professional post-processing and finishing services'
    ]
  },
  {
    title: 'Design Optimization',
    icon: 'lucide:pen-tool',
    description: 'CAD model review and optimization for printability, strength, and cost efficiency. Our engineers ensure your designs are manufacturable and cost-effective.',
    items: [
      'Printability analysis and design recommendations',
      'Support structure and orientation optimization',
      'Cost reduction through material and process optimization'
    ]
  }
]

const technologies = [
  {
    title: 'FDM Printing',
    icon: 'lucide:layers',
    description: 'Fused Deposition Modeling for strong, functional parts with engineering-grade materials'
  },
  {
    title: 'Resin Printing',
    icon: 'heroicons:beaker',
    description: 'High-resolution SLA/DLP prints with smooth surface finish and fine details'
  },
  {
    title: 'Multi-Material',
    icon: 'lucide:palette',
    description: 'Complex prints with multiple materials, colors, and advanced composites'
  }
]

const useCases = [
  {
    title: 'Engineering Prototypes',
    icon: 'heroicons:cog-6-tooth',
    description: 'Functional prototypes for mechanical testing and design validation'
  },
  {
    title: 'Custom Enclosures',
    icon: 'lucide:box',
    description: 'Protective cases and housings for electronics and IoT projects'
  },
  {
    title: 'Replacement Parts',
    icon: 'heroicons:wrench-screwdriver',
    description: 'On-demand manufacturing for hard-to-find or obsolete components'
  },
  {
    title: 'Art & Design Projects',
    icon: 'lucide:palette',
    description: 'Custom sculptures, architectural models, and artistic creations'
  }
]
</script>
