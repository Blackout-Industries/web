<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark opacity-90"></div>
      <div class="absolute inset-0 animated-gradient opacity-10"></div>

      <!-- Tactical Topographic Grid -->
      <div class="absolute inset-0 opacity-30">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="topo-grid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <!-- Diagonal lines creating isometric effect -->
              <path d="M 0,50 L 100,50" stroke="#FF6B00" stroke-width="0.5" opacity="0.3" />
              <path d="M 0,25 L 100,25" stroke="#FF6B00" stroke-width="0.5" opacity="0.2" />
              <path d="M 0,75 L 100,75" stroke="#FF6B00" stroke-width="0.5" opacity="0.2" />

              <!-- Vertical lines -->
              <path d="M 50,0 L 50,100" stroke="#FF6B00" stroke-width="0.5" opacity="0.3" />
              <path d="M 25,0 L 25,100" stroke="#FF6B00" stroke-width="0.5" opacity="0.2" />
              <path d="M 75,0 L 75,100" stroke="#FF6B00" stroke-width="0.5" opacity="0.2" />

              <!-- Corner markers -->
              <circle cx="50" cy="50" r="2" fill="#FF6B00" opacity="0.4" />
            </pattern>

            <!-- Animated gradient overlay -->
            <linearGradient id="topo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FF6B00;stop-opacity:0.1">
                <animate attributeName="stop-opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="50%" style="stop-color:#FF8C33;stop-opacity:0.2">
                <animate attributeName="stop-opacity" values="0.2;0.4;0.2" dur="4s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style="stop-color:#FF6B00;stop-opacity:0.1">
                <animate attributeName="stop-opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" />
              </stop>
            </linearGradient>
          </defs>

          <!-- Base grid -->
          <rect width="100%" height="100%" fill="url(#topo-grid)" />

          <!-- Animated gradient overlay -->
          <rect width="100%" height="100%" fill="url(#topo-gradient)" />
        </svg>
      </div>

      <!-- Content -->
      <div class="container-custom relative z-10 text-center py-20">
        <div class="animate-fade-in">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance">
            Engineering Infrastructure
            <span class="gradient-text block mt-2">That Scales</span>
          </h1>
          <p class="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8 text-balance">
            DevOps consulting, IoT automation, game infrastructure, and precision 3D printing for modern teams.
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
            From cloud infrastructure to smart homes, game backends to physical prototypes—we deliver precision at scale.
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

          <ServiceCard
            icon="heroicons:home-modern"
            title="IoT & Home Automation"
            description="Smart home solutions that integrate seamlessly. From concept to deployment."
            link="/services/iot-home-automation"
            variant="primary"
            :coming-soon="true"
            :features="[
              'Smart lighting & climate',
              'Security & monitoring',
              'Energy optimization',
              'Privacy-first architecture'
            ]"
          />

          <ServiceCard
            icon="heroicons:puzzle-piece"
            title="Game Development"
            description="From indie prototypes to production multiplayer systems and game infrastructure."
            link="/services/game-development"
            variant="accent"
            :coming-soon="true"
            :features="[
              'Multiplayer backends',
              'Low-latency networking',
              'Engine development',
              'DevOps for game studios'
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
  title: 'Blackout Industries - DevOps, IoT, Game Dev & 3D Printing',
  meta: [
    {
      name: 'description',
      content: 'DevOps consulting, platform engineering, IoT/home automation, game development, and 3D printing for modern teams. Engineering infrastructure that scales.'
    }
  ]
})
</script>
