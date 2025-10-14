<template>
  <div class="card group h-full flex flex-col relative">
    <div v-if="comingSoon" class="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
      Coming Soon™
    </div>
    <div class="flex items-center space-x-4 mb-4">
      <div
        class="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
        :class="iconBgClass"
      >
        <Icon :name="icon" class="w-6 h-6 text-white" />
      </div>
      <h3 class="text-xl md:text-2xl font-bold text-text-primary">{{ title }}</h3>
    </div>

    <p class="text-text-secondary mb-6 flex-1">{{ description }}</p>

    <ul v-if="features && features.length" class="space-y-2 mb-6">
      <li v-for="(feature, index) in features" :key="index" class="flex items-start space-x-2 text-sm text-text-secondary">
        <Icon name="mdi:check-circle" class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <span>{{ feature }}</span>
      </li>
    </ul>

    <NuxtLink :to="link" class="inline-flex items-center space-x-2 text-primary hover:text-primary-light font-medium transition-colors group/link">
      <span>Learn More</span>
      <Icon name="mdi:arrow-right" class="w-5 h-5 transition-transform group-hover/link:translate-x-1" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  title: string
  description: string
  link: string
  features?: string[]
  variant?: 'primary' | 'secondary' | 'accent'
  comingSoon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})

const iconBgClass = computed(() => {
  const variants = {
    primary: 'bg-gradient-to-br from-primary to-primary-dark',
    secondary: 'bg-gradient-to-br from-secondary to-green-600',
    accent: 'bg-gradient-to-br from-accent to-purple-600'
  }
  return variants[props.variant]
})
</script>
