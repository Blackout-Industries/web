<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark opacity-90"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 opacity-30"></div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center space-x-2 px-4 py-2 bg-secondary/20 border border-secondary/50 rounded-full text-secondary mb-6">
            <Icon name="heroicons:cube-transparent" class="w-5 h-5" />
            <span class="text-sm font-medium">3D Printing Services</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Precision 3D Printing for
            <span class="gradient-text block mt-2">Prototypes & Production</span>
          </h1>
          <p class="text-xl md:text-2xl text-text-secondary">
            From concept to physical product—fast, accurate, reliable.
          </p>
        </div>
      </div>
    </section>

    <!-- Service Details -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            What We <span class="gradient-text">Offer</span>
          </h2>
        </div>

        <div class="space-y-8 max-w-5xl mx-auto">
          <div class="card">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-secondary to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:bolt" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-2">Rapid Prototyping</h3>
                <p class="text-text-secondary mb-3">Quick turnaround for concept validation and iterative design support. Get your prototypes in days, not weeks. Perfect for validating designs before committing to expensive tooling.</p>
                <ul class="space-y-2">
                  <li class="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Functional prototypes for testing and validation</span>
                  </li>
                  <li class="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Iterative design refinement with fast feedback loops</span>
                  </li>
                  <li class="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Fast turnaround times (2-5 business days)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="lucide:box" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-2">Custom Manufacturing</h3>
                <p class="text-text-secondary mb-3">Small to medium batch production with a wide range of materials and finishing options. From one-offs to production runs, we handle manufacturing at any scale.</p>
                <ul class="space-y-2">
                  <li class="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Batch sizes from 1 to 1000+ units</span>
                  </li>
                  <li class="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Material selection: PLA, PETG, ABS, TPU, Nylon, Resin</span>
                  </li>
                  <li class="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Professional post-processing and finishing services</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-start space-x-4">
              <div class="w-12 h-12 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="lucide:pen-tool" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-2">Design Optimization</h3>
                <p class="text-text-secondary mb-3">CAD model review and optimization for printability, strength, and cost efficiency. Our engineers ensure your designs are manufacturable and cost-effective.</p>
                <ul class="space-y-2">
                  <li class="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Printability analysis and design recommendations</span>
                  </li>
                  <li class="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Support structure and orientation optimization</span>
                  </li>
                  <li class="flex items-start space-x-2 text-sm text-text-secondary">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>Cost reduction through material and process optimization</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology -->
    <section class="section">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Our <span class="gradient-text">Technology</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-secondary to-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:layers" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">FDM Printing</h3>
            <p class="text-text-secondary text-sm">Fused Deposition Modeling for strong, functional parts with engineering-grade materials</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:beaker" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Resin Printing</h3>
            <p class="text-text-secondary text-sm">High-resolution SLA/DLP prints with smooth surface finish and fine details</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Icon name="lucide:palette" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Multi-Material</h3>
            <p class="text-text-secondary text-sm">Complex prints with multiple materials, colors, and advanced composites</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Common <span class="gradient-text">Use Cases</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div class="card flex items-start space-x-4">
            <Icon name="heroicons:cog-6-tooth" class="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-bold mb-1">Engineering Prototypes</h3>
              <p class="text-text-secondary text-sm">Functional prototypes for mechanical testing and design validation</p>
            </div>
          </div>

          <div class="card flex items-start space-x-4">
            <Icon name="lucide:box" class="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-bold mb-1">Custom Enclosures</h3>
              <p class="text-text-secondary text-sm">Protective cases and housings for electronics and IoT projects</p>
            </div>
          </div>

          <div class="card flex items-start space-x-4">
            <Icon name="heroicons:wrench-screwdriver" class="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-bold mb-1">Replacement Parts</h3>
              <p class="text-text-secondary text-sm">On-demand manufacturing for hard-to-find or obsolete components</p>
            </div>
          </div>

          <div class="card flex items-start space-x-4">
            <Icon name="lucide:palette" class="w-8 h-8 text-secondary flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-bold mb-1">Art & Design Projects</h3>
              <p class="text-text-secondary text-sm">Custom sculptures, architectural models, and artistic creations</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container-custom">
        <div class="card glass text-center max-w-4xl mx-auto p-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Request a Quote
          </h2>
          <p class="text-lg text-text-secondary mb-8">
            Tell us about your project and we'll provide a detailed quote within 24 hours.
          </p>
          <NuxtLink to="/contact" class="btn btn-primary text-lg">
            Get Started
          </NuxtLink>
        </div>
      </div>
    </section>
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
</script>
