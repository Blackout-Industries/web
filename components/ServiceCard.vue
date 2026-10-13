<template>
  <div class="card service-card h-full flex flex-col relative">
    <span v-if="comingSoon" class="badge absolute top-4 right-4">Coming soon</span>

    <div class="flex items-center gap-4 mb-4" :class="{ 'pr-28': comingSoon }">
      <div class="icon-tile">
        <Icon :name="icon" class="w-5 h-5" />
      </div>
      <h3 class="text-lg font-semibold">{{ title }}</h3>
    </div>

    <p class="text-text-secondary mb-6 flex-1">{{ description }}</p>

    <ul v-if="features && features.length" class="space-y-2 mb-6">
      <li v-for="(feature, index) in features" :key="index" class="flex items-start gap-2 text-sm text-text-secondary">
        <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <span>{{ feature }}</span>
      </li>
    </ul>

    <NuxtLink :to="link" class="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors">
      <span>Learn More</span>
      <Icon name="mdi:arrow-right" class="w-5 h-5" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  description: string
  link: string
  features?: string[]
  comingSoon?: boolean
}>()
</script>
