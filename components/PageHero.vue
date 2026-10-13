<template>
  <section class="border-b border-dark-300 bg-dark py-16 md:py-24">
    <div class="container-custom">
      <div class="max-w-3xl animate-fade-in">
        <p v-if="eyebrow" class="eyebrow mb-4">{{ eyebrow }}</p>
        <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-balance">
          {{ title }}
          <span v-if="highlight" class="block mt-2 text-primary">{{ highlight }}</span>
        </h1>
        <p v-if="subtitle" class="mt-6 text-lg md:text-xl text-text-secondary">{{ subtitle }}</p>
        <div v-if="$slots.default" class="mt-8 flex flex-col sm:flex-row gap-4">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  highlight?: string
  subtitle?: string
  eyebrow?: string
}>()
</script>
