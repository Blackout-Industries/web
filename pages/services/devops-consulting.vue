<template>
  <div>
    <!-- Hero -->
    <section class="relative py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark opacity-90"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 opacity-30"></div>

      <div class="container-custom relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <div class="inline-flex items-center space-x-2 px-4 py-2 bg-accent/20 border border-accent/50 rounded-full text-accent mb-6">
            <Icon name="heroicons:server-stack" class="w-5 h-5" />
            <span class="text-sm font-medium">DevOps & Platform Engineering</span>
          </div>
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            Platform Engineering
            <span class="gradient-text block mt-2">That Powers Growth</span>
          </h1>
          <p class="text-xl md:text-2xl text-text-secondary">
            Build resilient, scalable infrastructure with expert guidance.
          </p>
        </div>
      </div>
    </section>

    <!-- Pain Points -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Challenges We <span class="gradient-text">Solve</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div class="card flex items-start space-x-4">
            <Icon name="heroicons:clock" class="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-bold mb-1">Slow Deployment Cycles</h3>
              <p class="text-text-secondary">Manual processes causing bottlenecks and delays</p>
            </div>
          </div>

          <div class="card flex items-start space-x-4">
            <Icon name="heroicons:currency-dollar" class="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-bold mb-1">Cloud Cost Overruns</h3>
              <p class="text-text-secondary">Unoptimized infrastructure draining your budget</p>
            </div>
          </div>

          <div class="card flex items-start space-x-4">
            <Icon name="heroicons:eye-slash" class="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-bold mb-1">Lack of Observability</h3>
              <p class="text-text-secondary">Limited visibility into system health and performance</p>
            </div>
          </div>

          <div class="card flex items-start space-x-4">
            <Icon name="heroicons:exclamation-triangle" class="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 class="text-lg font-bold mb-1">Manual, Error-Prone Processes</h3>
              <p class="text-text-secondary">Human errors causing outages and incidents</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Deep Dive -->
    <section class="section">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Our <span class="gradient-text">Expertise</span>
          </h2>
        </div>

        <div class="space-y-8 max-w-5xl mx-auto">
          <div class="card">
            <div class="flex items-start space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:cloud" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-2">Cloud Infrastructure Design</h3>
                <p class="text-text-secondary mb-4">Multi-cloud or cloud-agnostic architectures tailored to your needs. We design scalable, resilient infrastructure that grows with your business while optimizing costs and performance.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="tech-badge">AWS</span>
                  <span class="tech-badge">GCP</span>
                  <span class="tech-badge">Azure</span>
                  <span class="tech-badge">Terraform</span>
                  <span class="tech-badge">Terraform CDK</span>
                  <span class="tech-badge">Cloudflare</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-start space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-accent to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="lucide:container" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-2">Kubernetes & Containerization</h3>
                <p class="text-text-secondary mb-4">Enterprise-grade orchestration, scaling, and security for containerized applications. From cluster design to production hardening, we ensure your containers run smoothly at scale.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="tech-badge">Kubernetes</span>
                  <span class="tech-badge">Docker</span>
                  <span class="tech-badge">Helm</span>
                  <span class="tech-badge">ArgoCD</span>
                  <span class="tech-badge">Istio</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-start space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-secondary to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="lucide:git-branch" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-2">CI/CD Pipelines</h3>
                <p class="text-text-secondary mb-4">Automated testing, deployment, and rollback workflows that reduce time-to-production. We build pipelines that are fast, reliable, and maintainable with comprehensive quality gates.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="tech-badge">GitHub Actions</span>
                  <span class="tech-badge">GitLab CI</span>
                  <span class="tech-badge">Jenkins</span>
                  <span class="tech-badge">Tekton</span>
                  <span class="tech-badge">CircleCI</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-start space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-primary-light to-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:chart-bar-square" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-2">Monitoring & Observability</h3>
                <p class="text-text-secondary mb-4">Comprehensive metrics, logs, traces, and alerting systems that provide deep insights into system health. We implement observability best practices so you know exactly what's happening in production.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="tech-badge">Prometheus</span>
                  <span class="tech-badge">Grafana</span>
                  <span class="tech-badge">Datadog</span>
                  <span class="tech-badge">OpenTelemetry</span>
                  <span class="tech-badge">ELK Stack</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-start space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="heroicons:shield-check" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-2">Security & Compliance</h3>
                <p class="text-text-secondary mb-4">Infrastructure security hardening, secrets management, and policy-as-code implementation. We ensure your infrastructure meets compliance standards while maintaining developer velocity.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="tech-badge">Vault</span>
                  <span class="tech-badge">SOPS</span>
                  <span class="tech-badge">OPA</span>
                  <span class="tech-badge">Falco</span>
                  <span class="tech-badge">Trivy</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card">
            <div class="flex items-start space-x-4 mb-4">
              <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name="lucide:network" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold mb-2">Networking & Service Mesh</h3>
                <p class="text-text-secondary mb-4">Advanced networking solutions including service mesh implementations, load balancing, and traffic management for microservices architectures.</p>
                <div class="flex flex-wrap gap-2">
                  <span class="tech-badge">Istio</span>
                  <span class="tech-badge">Linkerd</span>
                  <span class="tech-badge">Envoy</span>
                  <span class="tech-badge">Consul</span>
                  <span class="tech-badge">NGINX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="card glass text-center max-w-4xl mx-auto p-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Let's Discuss Your Infrastructure Needs
          </h2>
          <p class="text-lg text-text-secondary mb-8">
            Schedule a consultation to explore how we can optimize your DevOps workflows.
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
  title: 'DevOps Consulting - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Expert DevOps consulting and platform engineering services. Build resilient, scalable infrastructure with Kubernetes, CI/CD, and cloud-native architectures.'
    }
  ]
})
</script>

<style scoped>
.tech-badge {
  @apply px-3 py-1 bg-dark-200 border border-dark-300 rounded-full text-sm text-text-secondary font-mono;
}
</style>
