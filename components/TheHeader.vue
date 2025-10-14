<template>
  <header class="sticky top-0 z-50 glass border-b border-dark-300">
    <nav class="container-custom">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="relative w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center">
            <!-- Orange glow -->
            <div class="absolute inset-0 bg-primary/20 rounded-lg blur-lg group-hover:bg-primary/30 transition-all"></div>
            <!-- Logo container -->
            <div class="relative w-full h-full rounded-lg flex items-center justify-center transition-all overflow-hidden">
              <img
                src="/logo.png"
                alt="Blackout Industries"
                class="w-[140%] h-[140%] object-cover group-hover:scale-110 transition-transform"
              />
            </div>
          </div>
          <span class="text-lg md:text-xl font-bold tracking-tight">
            <span class="text-primary">Blackout</span> <span class="text-text-primary">Industries</span>
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="nav-link">Home</NuxtLink>
          <div class="relative group">
            <button class="nav-link flex items-center space-x-1">
              <span>Services</span>
              <Icon name="heroicons:chevron-down" class="w-4 h-4 transition-transform group-hover:rotate-180" />
            </button>
            <!-- Dropdown -->
            <div class="absolute top-full left-0 mt-2 w-64 glass rounded-lg border border-dark-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl">
              <NuxtLink to="/services" class="dropdown-item">
                <Icon name="heroicons:squares-2x2" class="w-5 h-5 text-primary" />
                <div>
                  <div class="font-medium">All Services</div>
                  <div class="text-xs text-text-tertiary">Overview</div>
                </div>
              </NuxtLink>
              <NuxtLink to="/services/devops-consulting" class="dropdown-item">
                <Icon name="heroicons:server-stack" class="w-5 h-5 text-accent" />
                <div>
                  <div class="font-medium">DevOps Consulting</div>
                  <div class="text-xs text-text-tertiary">Platform Engineering</div>
                </div>
              </NuxtLink>
              <NuxtLink to="/services/3d-printing" class="dropdown-item">
                <Icon name="heroicons:cube-transparent" class="w-5 h-5 text-secondary" />
                <div>
                  <div class="font-medium">3D Printing</div>
                  <div class="text-xs text-text-tertiary">Rapid Prototyping</div>
                </div>
              </NuxtLink>
              <NuxtLink to="/services/iot-home-automation" class="dropdown-item">
                <Icon name="heroicons:home-modern" class="w-5 h-5 text-primary" />
                <div>
                  <div class="font-medium">IoT & Home Automation</div>
                  <div class="text-xs text-text-tertiary">Smart Home Solutions</div>
                </div>
              </NuxtLink>
              <NuxtLink to="/services/game-development" class="dropdown-item">
                <Icon name="heroicons:puzzle-piece" class="w-5 h-5 text-accent" />
                <div>
                  <div class="font-medium">Game Development</div>
                  <div class="text-xs text-text-tertiary">Multiplayer & Backends</div>
                </div>
              </NuxtLink>
            </div>
          </div>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          <NuxtLink to="/contact" class="btn btn-primary">Contact</NuxtLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="md:hidden text-text-primary p-2 hover:bg-dark-200 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <Icon v-if="!mobileMenuOpen" name="heroicons:bars-3" class="w-6 h-6" />
          <Icon v-else name="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-dark-300">
          <div class="flex flex-col space-y-4">
            <NuxtLink to="/" class="mobile-nav-link" @click="mobileMenuOpen = false">Home</NuxtLink>
            <NuxtLink to="/services" class="mobile-nav-link" @click="mobileMenuOpen = false">All Services</NuxtLink>
            <NuxtLink to="/services/devops-consulting" class="mobile-nav-link pl-4" @click="mobileMenuOpen = false">
              <Icon name="heroicons:server-stack" class="w-5 h-5 text-accent" />
              <span>DevOps Consulting</span>
            </NuxtLink>
            <NuxtLink to="/services/3d-printing" class="mobile-nav-link pl-4" @click="mobileMenuOpen = false">
              <Icon name="heroicons:cube-transparent" class="w-5 h-5 text-secondary" />
              <span>3D Printing</span>
            </NuxtLink>
            <NuxtLink to="/services/iot-home-automation" class="mobile-nav-link pl-4" @click="mobileMenuOpen = false">
              <Icon name="heroicons:home-modern" class="w-5 h-5 text-primary" />
              <span>IoT & Home Automation</span>
            </NuxtLink>
            <NuxtLink to="/services/game-development" class="mobile-nav-link pl-4" @click="mobileMenuOpen = false">
              <Icon name="heroicons:puzzle-piece" class="w-5 h-5 text-accent" />
              <span>Game Development</span>
            </NuxtLink>
            <NuxtLink to="/about" class="mobile-nav-link" @click="mobileMenuOpen = false">About</NuxtLink>
            <NuxtLink to="/contact" class="btn btn-primary w-full text-center" @click="mobileMenuOpen = false">Contact</NuxtLink>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)

// Close mobile menu on route change
const route = useRoute()
watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>

<style scoped>
.nav-link {
  @apply text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium;
}

.dropdown-item {
  @apply flex items-center space-x-3 px-4 py-3 hover:bg-dark-200 transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg;
}

.mobile-nav-link {
  @apply text-text-secondary hover:text-text-primary transition-colors duration-200 font-medium py-2 flex items-center space-x-2;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
