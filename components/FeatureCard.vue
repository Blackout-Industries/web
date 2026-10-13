<template>
  <div class="card feature-card h-full flex flex-col">
    <div class="flex items-center gap-4 mb-4">
      <div v-if="icon" class="icon-tile">
        <Icon :name="icon" class="w-5 h-5" />
      </div>
      <h3 class="text-lg font-semibold">{{ title }}</h3>
      <span v-if="badge" class="badge ml-auto">{{ badge }}</span>
    </div>

    <p v-if="description" class="text-text-secondary">{{ description }}</p>

    <ul v-if="items && items.length" class="mt-4 space-y-2">
      <li v-for="(item, index) in items" :key="index" class="flex items-start gap-2 text-sm text-text-secondary">
        <Icon name="heroicons:check-circle" class="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <span>{{ item }}</span>
      </li>
    </ul>

    <div v-if="tags && tags.length" class="mt-4 flex flex-wrap gap-2">
      <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  icon?: string
  description?: string
  items?: string[]
  tags?: string[]
  badge?: string
}>()
</script>
