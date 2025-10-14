<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark opacity-90"></div>
      <div class="absolute inset-0 animated-gradient opacity-10"></div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Services Built for
            <span class="gradient-text block mt-2">Modern Teams</span>
          </h1>
          <p class="text-xl md:text-2xl text-text-secondary">
            From cloud infrastructure to smart homes, game backends to precision 3D printing—we deliver expertise at scale.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <ServiceCard
            icon="mdi:cloud-outline"
            title="DevOps & Platform Engineering"
            description="Build infrastructure that scales with your ambitions. Expert guidance for cloud-native architectures, container orchestration, and automated deployment pipelines."
            link="/services/devops-consulting"
            variant="accent"
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
            variant="secondary"
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
            variant="primary"
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
            description="From indie prototypes to production-ready multiplayer systems. We build games, game engines, and backend infrastructure that scales."
            link="/services/game-development"
            variant="accent"
            :coming-soon="true"
            :features="[
              'Multiplayer backend infrastructure',
              'Low-latency networking & netcode',
              'Engine development & optimization',
              'DevOps & CI/CD for game studios',
              'Analytics & telemetry systems',
              'Anti-cheat & security hardening'
            ]"
          />
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            How We <span class="gradient-text">Work</span>
          </h2>
          <p class="text-lg text-text-secondary max-w-2xl mx-auto">
            Our proven process ensures smooth delivery from discovery to ongoing support.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-white">1</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Discover</h3>
            <p class="text-text-secondary">Understand your needs, challenges, and goals.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-white">2</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Design</h3>
            <p class="text-text-secondary">Architect the solution with best practices.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-secondary to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-white">3</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Deliver</h3>
            <p class="text-text-secondary">Implement with precision and attention to detail.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-white">4</span>
            </div>
            <h3 class="text-xl font-bold mb-2">Support</h3>
            <p class="text-text-secondary">Maintain and optimize for continuous improvement.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="card glass text-center max-w-4xl mx-auto p-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Let's Discuss Your Project
          </h2>
          <p class="text-lg text-text-secondary mb-8">
            Schedule a consultation to explore how we can help you succeed.
          </p>
          <NuxtLink to="/contact" class="btn btn-primary text-lg">
            Get in Touch
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Services - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'DevOps consulting, platform engineering, IoT/home automation, game development, and 3D printing services. From Kubernetes to smart homes to multiplayer backends—we deliver precision at scale.'
    }
  ]
})
</script>
