<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark opacity-90"></div>
      <div class="absolute inset-0 animated-gradient opacity-10"></div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Built by Engineers,
            <span class="gradient-text block mt-2">for Engineers</span>
          </h1>
          <p class="text-xl md:text-2xl text-text-secondary">
            Blackout Industries combines software expertise with physical manufacturing.
          </p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="max-w-4xl mx-auto">
          <div class="prose prose-invert max-w-none">
            <div class="card mb-8">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
              <p class="text-text-secondary text-lg leading-relaxed mb-4">
                Founded in May 2023, Blackout Industries s.r.o was born from a simple observation: too many organizations were trapped in legacy on-premise infrastructure, struggling with manual deployments, skyrocketing cloud costs, and systems that couldn't scale with their ambitions.
              </p>
              <p class="text-text-secondary text-lg leading-relaxed">
                With over 10 years of hands-on DevOps and infrastructure engineering experience, transforming enterprise systems and delivering cloud-native solutions across Azure, AWS, and Oracle Cloud, we saw an opportunity to help teams ditch the chaos and embrace modern, resilient infrastructure. At the same time, we recognized the power of rapid prototyping through 3D printing—turning digital concepts into physical prototypes in hours, not weeks.
              </p>
            </div>

            <div class="card mb-8">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
              <p class="text-text-secondary text-lg leading-relaxed">
                We help teams build better, faster. Whether it's migrating from on-premise to cloud-native architectures, designing GitOps workflows with ArgoCD and Helm, or creating custom 3D-printed components, we bring battle-tested expertise and pragmatic problem-solving to every engagement. We believe in automation, observability, security-first design, and delivering measurable value—not just checking boxes.
              </p>
            </div>

            <div class="card mb-8">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Our Expertise</h2>
              <div class="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 class="text-xl font-semibold mb-3 text-primary">Cloud & Infrastructure</h3>
                  <ul class="text-text-secondary space-y-2">
                    <li>Multi-cloud architecture (Azure, AWS, OCI, GCP)</li>
                    <li>Container orchestration & service mesh</li>
                    <li>API gateways & edge networking</li>
                    <li>Managed databases & data platforms</li>
                    <li>Secrets management & encryption</li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-3 text-secondary">Automation & DevOps</h3>
                  <ul class="text-text-secondary space-y-2">
                    <li>GitOps workflows & declarative deployments</li>
                    <li>CI/CD pipeline design & optimization</li>
                    <li>Infrastructure as Code across platforms</li>
                    <li>Event-driven autoscaling & serverless</li>
                    <li>Policy enforcement & compliance automation</li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-3 text-accent">Observability & Data</h3>
                  <ul class="text-text-secondary space-y-2">
                    <li>Metrics, logs, traces & alerting systems</li>
                    <li>Database clustering & high availability</li>
                    <li>Schema migration strategies</li>
                    <li>Custom automation & integrations</li>
                  </ul>
                </div>
                <div>
                  <h3 class="text-xl font-semibold mb-3 text-primary-light">Security & Quality</h3>
                  <ul class="text-text-secondary space-y-2">
                    <li>Code quality gates & static analysis</li>
                    <li>Security scanning & vulnerability management</li>
                    <li>Automated testing & end-to-end validation</li>
                    <li>Multi-platform delivery pipelines</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="card">
              <h2 class="text-2xl md:text-3xl font-bold mb-4">Our Approach</h2>
              <p class="text-text-secondary text-lg leading-relaxed mb-4">
                We don't believe in one-size-fits-all solutions or following trends blindly. Every engagement starts with understanding your constraints, your team's capabilities, and your business goals. Then we architect solutions that fit your unique context—whether that's a full cloud migration, CI/CD pipeline overhaul, or iterative infrastructure improvements.
              </p>
              <p class="text-text-secondary text-lg leading-relaxed">
                With a decade of experience across enterprise projects, multi-platform deployments, and complex multi-cloud environments, we bring real-world expertise and lessons learned. Technical rigor meets creative problem-solving—that's the Blackout Industries way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Our <span class="gradient-text">Values</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:sparkles" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Technical Excellence</h3>
            <p class="text-text-secondary text-sm">We hold ourselves to the highest standards of quality and craftsmanship.</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-secondary to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:rocket-launch" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Client Success</h3>
            <p class="text-text-secondary text-sm">Your success is our success. We measure our impact by the results you achieve.</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:academic-cap" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Continuous Learning</h3>
            <p class="text-text-secondary text-sm">Technology evolves fast. We stay at the forefront through constant learning.</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-light to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:chat-bubble-left-right" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Transparent Communication</h3>
            <p class="text-text-secondary text-sm">Clear, honest communication builds trust and drives better outcomes.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="card glass text-center max-w-4xl mx-auto p-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Let's Work Together
          </h2>
          <p class="text-lg text-text-secondary mb-8">
            Ready to build something great? We'd love to hear about your project.
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
  title: 'About - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Built by engineers, for engineers. Learn about Blackout Industries\' mission to help teams build better, faster with DevOps consulting and 3D printing services.'
    }
  ]
})
</script>
