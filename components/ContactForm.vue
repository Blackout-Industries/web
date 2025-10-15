<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Name -->
    <div>
      <label for="name" class="block text-sm font-medium text-text-primary mb-2">
        Name <span class="text-primary">*</span>
      </label>
      <input
        id="name"
        v-model="form.name"
        type="text"
        required
        class="form-input"
        placeholder="John Doe"
      />
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-text-primary mb-2">
        Email <span class="text-primary">*</span>
      </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="form-input"
        placeholder="john@example.com"
      />
    </div>

    <!-- Company -->
    <div>
      <label for="company" class="block text-sm font-medium text-text-primary mb-2">
        Company
      </label>
      <input
        id="company"
        v-model="form.company"
        type="text"
        class="form-input"
        placeholder="Acme Corp"
      />
    </div>

    <!-- Service Interest -->
    <div>
      <label for="service" class="block text-sm font-medium text-text-primary mb-2">
        Service Interest <span class="text-primary">*</span>
      </label>
      <select
        id="service"
        v-model="form.service"
        required
        class="form-input"
      >
        <option value="">Select a service...</option>
        <option value="devops">DevOps & Platform Engineering</option>
        <option value="3d-printing">3D Printing</option>
        <option value="both">Both Services</option>
        <option value="other">Other</option>
      </select>
    </div>

    <!-- Message -->
    <div>
      <label for="message" class="block text-sm font-medium text-text-primary mb-2">
        Message <span class="text-primary">*</span>
      </label>
      <textarea
        id="message"
        v-model="form.message"
        required
        rows="5"
        class="form-input resize-none"
        placeholder="Tell us about your project..."
        minlength="20"
      ></textarea>
      <p class="mt-1 text-xs text-text-tertiary">Minimum 20 characters</p>
    </div>

    <!-- Honeypot (hidden) -->
    <input
      v-model="form.honeypot"
      type="text"
      name="website"
      class="hidden"
      tabindex="-1"
      autocomplete="off"
    />

    <!-- Success Message -->
    <div v-if="success" class="p-4 bg-secondary/10 border border-secondary rounded-lg flex items-start space-x-3">
      <Icon name="mdi:check-circle" class="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
      <div>
        <p class="font-medium text-secondary">Message sent successfully!</p>
        <p class="text-sm text-text-secondary mt-1">We'll get back to you within 24 hours.</p>
      </div>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="p-4 bg-red-500/10 border border-red-500 rounded-lg flex items-start space-x-3">
      <Icon name="mdi:alert-circle" class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
      <div>
        <p class="font-medium text-red-500">Failed to send message</p>
        <p class="text-sm text-text-secondary mt-1">{{ error }}</p>
      </div>
    </div>

    <!-- Submit Button -->
    <button
      type="submit"
      :disabled="loading"
      class="btn btn-primary w-full relative"
    >
      <span v-if="!loading">Send Message</span>
      <span v-else class="flex items-center justify-center">
        <Icon name="mdi:loading" class="w-5 h-5 animate-spin mr-2" />
        Sending...
      </span>
    </button>
  </form>
</template>

<script setup lang="ts">
const form = reactive({
  name: '',
  email: '',
  company: '',
  service: '',
  message: '',
  honeypot: ''
})

const loading = ref(false)
const success = ref(false)
const error = ref('')

const handleSubmit = async () => {
  // Check honeypot
  if (form.honeypot) {
    return
  }

  loading.value = true
  success.value = false
  error.value = ''

  try {
    // Call Nuxt API route
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        company: form.company,
        service: form.service,
        message: form.message,
        honeypot: form.honeypot
      }
    })

    if (response.success) {
      success.value = true

      // Reset form
      form.name = ''
      form.email = ''
      form.company = ''
      form.service = ''
      form.message = ''

      // Hide success message after 5 seconds
      setTimeout(() => {
        success.value = false
      }, 5000)
    }
  } catch (err: any) {
    console.error('Contact form error:', err)
    error.value = err.data?.message || 'Please try again later or contact us directly at offers.blackout.industries@proton.me'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-input {
  @apply w-full px-4 py-3 bg-dark-200 border border-dark-300 rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all;
}

.form-input:focus {
  @apply bg-dark-100;
}

button:disabled {
  @apply opacity-50 cursor-not-allowed;
}
</style>
