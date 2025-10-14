<template>
  <div class="section bg-dark-100">
    <div class="container-custom">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-5xl font-bold mb-4">
          Powered By <span class="gradient-text">Modern Tech</span>
        </h2>
        <p class="text-text-secondary text-lg max-w-2xl mx-auto">
          We leverage cutting-edge technologies to deliver robust, scalable solutions
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
        <!-- Cloud Providers -->
        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-orange-500 to-orange-600">
            <Icon name="heroicons:cloud" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">AWS</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-blue-500 to-blue-600">
            <Icon name="heroicons:cloud" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Azure</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-red-500 to-red-600">
            <Icon name="heroicons:cloud" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">GCP</span>
        </div>

        <!-- Container & Orchestration -->
        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-primary to-primary-dark">
            <Icon name="simple-icons:docker" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Docker</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-accent to-purple-600">
            <Icon name="simple-icons:kubernetes" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Kubernetes</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-primary-light to-primary">
            <Icon name="lucide:container" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Helm</span>
        </div>

        <!-- IaC & Configuration -->
        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-purple-500 to-purple-700">
            <Icon name="simple-icons:terraform" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Terraform</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-red-600 to-red-700">
            <Icon name="simple-icons:ansible" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Ansible</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-secondary to-green-600">
            <Icon name="heroicons:code-bracket" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Pulumi</span>
        </div>

        <!-- CI/CD -->
        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-gray-700 to-gray-900">
            <Icon name="simple-icons:githubactions" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">GitHub Actions</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-orange-600 to-orange-700">
            <Icon name="simple-icons:gitlab" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">GitLab CI</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-red-500 to-red-600">
            <Icon name="lucide:git-branch" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Jenkins</span>
        </div>

        <!-- Monitoring & Observability -->
        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-orange-500 to-red-600">
            <Icon name="simple-icons:prometheus" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Prometheus</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-orange-500 to-yellow-600">
            <Icon name="simple-icons:grafana" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Grafana</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-purple-600 to-purple-800">
            <Icon name="heroicons:chart-bar" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Datadog</span>
        </div>

        <!-- Security & Secrets -->
        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-yellow-500 to-yellow-600">
            <Icon name="heroicons:lock-closed" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">Vault</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-gray-600 to-gray-700">
            <Icon name="heroicons:shield-check" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">SOPS</span>
        </div>

        <div class="tech-item group">
          <div class="tech-icon-wrapper bg-gradient-to-br from-primary to-secondary">
            <Icon name="lucide:server" class="w-8 h-8 text-white" />
          </div>
          <span class="tech-label">ArgoCD</span>
        </div>
      </div>

      <!-- Tech Categories -->
      <div class="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
        <div class="glass rounded-lg p-6 text-center">
          <Icon name="heroicons:server-stack" class="w-10 h-10 text-primary mx-auto mb-3" />
          <h3 class="font-bold mb-2">Infrastructure</h3>
          <p class="text-sm text-text-secondary">Cloud-native architectures</p>
        </div>

        <div class="glass rounded-lg p-6 text-center">
          <Icon name="lucide:container" class="w-10 h-10 text-accent mx-auto mb-3" />
          <h3 class="font-bold mb-2">Orchestration</h3>
          <p class="text-sm text-text-secondary">Container management</p>
        </div>

        <div class="glass rounded-lg p-6 text-center">
          <Icon name="heroicons:chart-bar-square" class="w-10 h-10 text-secondary mx-auto mb-3" />
          <h3 class="font-bold mb-2">Observability</h3>
          <p class="text-sm text-text-secondary">Metrics & monitoring</p>
        </div>

        <div class="glass rounded-lg p-6 text-center">
          <Icon name="heroicons:shield-check" class="w-10 h-10 text-primary-light mx-auto mb-3" />
          <h3 class="font-bold mb-2">Security</h3>
          <p class="text-sm text-text-secondary">Compliance & secrets</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tech-item {
  @apply flex flex-col items-center space-y-3 p-4 rounded-lg transition-all duration-300;
}

.tech-item:hover {
  @apply transform -translate-y-2;
}

.tech-icon-wrapper {
  @apply w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg;
}

.tech-item:hover .tech-icon-wrapper {
  @apply scale-110 shadow-2xl;
}

.tech-label {
  @apply text-sm font-medium text-text-secondary group-hover:text-text-primary transition-colors duration-300;
}
</style>
