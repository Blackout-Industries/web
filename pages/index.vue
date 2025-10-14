<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark opacity-90"></div>
      <div class="absolute inset-0 animated-gradient opacity-10"></div>

      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-20" style="background-image: linear-gradient(#0EA5E9 1px, transparent 1px), linear-gradient(90deg, #0EA5E9 1px, transparent 1px); background-size: 50px 50px;"></div>

      <!-- Content -->
      <div class="container-custom relative z-10 text-center py-20">
        <div class="animate-fade-in">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Engineering Infrastructure
            <span class="gradient-text block mt-2">That Scales</span>
          </h1>
          <p class="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8 text-balance">
            DevOps consulting, platform engineering, and precision 3D printing for modern teams.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#services" class="btn btn-primary text-lg">
              Explore Services
            </a>
            <NuxtLink to="/contact" class="btn btn-secondary text-lg">
              Get in Touch
            </NuxtLink>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="heroicons:chevron-down" class="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section id="services" class="section bg-dark-100">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Our <span class="gradient-text">Services</span>
          </h2>
          <p class="text-lg text-text-secondary max-w-2xl mx-auto">
            From cloud infrastructure to physical prototypes—we deliver precision at scale.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ServiceCard
            icon="heroicons:server-stack"
            title="DevOps Consulting"
            description="Build resilient, scalable infrastructure with expert guidance. From Kubernetes to CI/CD pipelines."
            link="/services/devops-consulting"
            variant="accent"
            :features="[
              'Cloud infrastructure design',
              'Kubernetes & containerization',
              'CI/CD pipeline automation',
              'Monitoring & observability'
            ]"
          />

          <ServiceCard
            icon="heroicons:cube-transparent"
            title="3D Printing Services"
            description="Turn digital designs into physical reality. Rapid prototyping and custom manufacturing."
            link="/services/3d-printing"
            variant="secondary"
            :features="[
              'Rapid prototyping',
              'Custom part manufacturing',
              'CAD model optimization',
              'Multi-material printing'
            ]"
          />
        </div>
      </div>
    </section>

    <!-- TechStack Showcase -->
    <TechStack />

    <!-- Why Blackout Industries -->
    <section class="section">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Why <span class="gradient-text">Blackout Industries</span>
          </h2>
          <p class="text-lg text-text-secondary max-w-2xl mx-auto">
            We combine technical excellence with rapid execution to transform your vision into reality.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:sparkles" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Technical Excellence</h3>
            <p class="text-text-secondary">Deep expertise in cloud-native architectures and modern engineering practices.</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:rocket-launch" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Rapid Execution</h3>
            <p class="text-text-secondary">Deliver MVPs in weeks, not months. We move fast without compromising quality.</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-secondary to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:hand-raised" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">End-to-End Support</h3>
            <p class="text-text-secondary">From strategy to implementation and beyond—we're with you every step.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="card glass text-center max-w-4xl mx-auto p-12 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50"></div>
          <div class="relative z-10">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Infrastructure?
            </h2>
            <p class="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you build, scale, and optimize your systems.
            </p>
            <NuxtLink to="/contact" class="btn btn-primary text-lg">
              Schedule a Consultation
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Blackout Industries - DevOps & 3D Printing Consulting',
  meta: [
    {
      name: 'description',
      content: 'DevOps consulting, platform engineering, and precision 3D printing for modern teams. Engineering infrastructure that scales.'
    }
  ]
})
</script>
