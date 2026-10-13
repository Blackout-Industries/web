<template>
  <section :id="id" class="section" :class="alt ? 'bg-dark-100' : 'bg-dark'">
    <div class="container-custom">
      <div v-if="title" class="max-w-2xl mb-10">
        <p v-if="eyebrow" class="eyebrow mb-3">{{ eyebrow }}</p>
        <h2 class="text-2xl md:text-3xl font-bold">
          {{ title }}
          <span v-if="highlight" class="text-primary">{{ highlight }}</span>
        </h2>
        <p v-if="subtitle" class="mt-3 text-text-secondary">{{ subtitle }}</p>
      </div>
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  id?: string
  title?: string
  highlight?: string
  subtitle?: string
  eyebrow?: string
  alt?: boolean
}>(), {
  alt: false
})
</script>
