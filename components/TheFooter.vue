<template>
  <footer class="bg-dark-100 border-t border-dark-300 mt-auto">
    <div class="container-custom py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
        <!-- Brand -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div class="relative w-14 h-14 rounded-lg flex items-center justify-center">
              <!-- Orange glow -->
              <div class="absolute inset-0 bg-primary/15 rounded-lg blur-lg"></div>
              <!-- Logo container -->
              <div class="relative w-full h-full rounded-lg bg-gradient-to-br from-dark-200 to-dark flex items-center justify-center shadow-md shadow-primary/10 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Blackout Industries"
                  class="w-[140%] h-[140%] object-cover"
                />
              </div>
            </div>
            <span class="text-xl font-bold">
              <span class="text-primary">Blackout</span> <span class="text-text-primary">Industries</span>
            </span>
          </div>
          <p class="text-text-secondary max-w-md mb-4">
            Engineering infrastructure that scales. DevOps consulting, IoT automation, game infrastructure, and precision 3D printing for modern teams.
          </p>
          <div class="flex space-x-4">
            <a href="https://github.com/blackoutindustries" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub">
              <Icon name="mdi:github" class="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/company/blackout-industries" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn">
              <Icon name="mdi:linkedin" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Company -->
        <div>
          <h3 class="text-text-primary font-semibold mb-4">Company</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/about" class="footer-link">About</NuxtLink></li>
            <li><NuxtLink to="/contact" class="footer-link">Contact</NuxtLink></li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="text-text-primary font-semibold mb-4">Services</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/services/devops-consulting" class="footer-link">DevOps Consulting</NuxtLink></li>
            <li><NuxtLink to="/services/3d-printing" class="footer-link">3D Printing</NuxtLink></li>
            <li><NuxtLink to="/services/iot-home-automation" class="footer-link">IoT & Home Automation</NuxtLink></li>
            <li><NuxtLink to="/services/game-development" class="footer-link">Game Development</NuxtLink></li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-dark-300 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p class="text-text-tertiary text-sm">
          &copy; {{ currentYear }} Blackout Industries. All rights reserved.
        </p>
        <div class="flex space-x-6 text-sm">
          <a href="#" class="text-text-tertiary hover:text-text-primary transition-colors">Privacy Policy</a>
          <a href="#" class="text-text-tertiary hover:text-text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-link {
  @apply text-text-secondary hover:text-primary transition-colors duration-200 text-sm;
}

.social-link {
  @apply text-text-secondary hover:text-primary transition-all duration-200 hover:scale-110;
}
</style>
