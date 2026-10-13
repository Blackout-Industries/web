<template>
  <section class="tech-stack section bg-dark">
    <div class="container-custom">
      <div class="max-w-2xl mb-10">
        <h2 class="text-2xl md:text-3xl font-bold">
          Powered By <span class="text-primary">Modern Tech</span>
        </h2>
        <p class="mt-3 text-text-secondary">
          We leverage cutting-edge technologies to deliver robust, scalable solutions
        </p>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-5xl">
        <div
          v-for="tech in techs"
          :key="tech.label"
          class="tech-item flex flex-col items-center gap-3 p-4"
        >
          <div class="icon-tile w-14 h-14">
            <Icon :name="tech.icon" class="w-7 h-7" />
          </div>
          <span class="tech-label text-sm font-medium text-text-secondary">{{ tech.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const techs = [
  { label: 'AWS', icon: 'heroicons:cloud' },
  { label: 'Azure', icon: 'heroicons:cloud' },
  { label: 'Python', icon: 'simple-icons:python' },
  { label: 'Docker', icon: 'simple-icons:docker' },
  { label: 'Kubernetes', icon: 'simple-icons:kubernetes' },
  { label: 'Helm', icon: 'lucide:container' },
  { label: 'Terraform CDK', icon: 'simple-icons:terraform' },
  { label: 'Ansible', icon: 'simple-icons:ansible' },
  { label: 'Crossplane', icon: 'heroicons:puzzle-piece' },
  { label: 'GitHub Actions', icon: 'simple-icons:githubactions' },
  { label: 'GitLab CI', icon: 'simple-icons:gitlab' },
  { label: 'Backstage', icon: 'heroicons:building-office-2' },
  { label: 'Prometheus', icon: 'simple-icons:prometheus' },
  { label: 'Grafana', icon: 'simple-icons:grafana' },
  { label: 'Loki', icon: 'heroicons:document-text' },
  { label: 'Vault', icon: 'heroicons:lock-closed' },
  { label: 'NGINX', icon: 'simple-icons:nginx' },
  { label: 'ArgoCD', icon: 'lucide:server' }
]
</script>
