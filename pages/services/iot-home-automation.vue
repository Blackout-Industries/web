<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="hero-gradient py-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-gradient-to-br from-cyan-500 via-purple-500 to-pink-500 animate-pulse"></div>
      </div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <Icon name="heroicons:home-modern" class="w-20 h-20 mx-auto mb-6 text-cyan-400" />
          <h1 class="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            IoT & Home Automation
          </h1>
          <p class="text-xl text-gray-300 mb-8 leading-relaxed">
            Smart home solutions and IoT systems that actually work. From concept to deployment, we build intelligent automation that integrates seamlessly with your life.
          </p>
        </div>
      </div>
    </section>

    <!-- What We Build -->
    <section class="section bg-black">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center gradient-text">What We Build</h2>

        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="card group">
            <Icon name="heroicons:light-bulb" class="w-12 h-12 mb-4 text-yellow-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Smart Lighting</h3>
            <p class="text-gray-400">Automated lighting systems with presence detection, circadian rhythm sync, and voice control integration.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:fire" class="w-12 h-12 mb-4 text-orange-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Climate Control</h3>
            <p class="text-gray-400">Smart HVAC automation with zone control, energy optimization, and predictive scheduling.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:lock-closed" class="w-12 h-12 mb-4 text-green-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Security Systems</h3>
            <p class="text-gray-400">Camera integration, door locks, alarm systems with real-time notifications and remote monitoring.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:speaker-wave" class="w-12 h-12 mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Multi-Room Audio</h3>
            <p class="text-gray-400">Whole-home audio systems with synchronized playback, voice control, and streaming integration.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:bolt" class="w-12 h-12 mb-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Energy Monitoring</h3>
            <p class="text-gray-400">Real-time energy tracking, solar integration, and automated optimization to reduce consumption.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:wifi" class="w-12 h-12 mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Custom Sensors</h3>
            <p class="text-gray-400">Environmental monitoring, leak detection, air quality sensors, and custom IoT device development.</p>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="card bg-gradient-to-br from-gray-900 to-gray-800 border-cyan-500/30">
          <h3 class="text-2xl font-semibold mb-6 text-center text-white">Technologies We Use</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Icon name="heroicons:home-modern" class="w-10 h-10 mx-auto mb-2 text-cyan-400" />
              <div class="text-sm text-gray-300">Home Assistant</div>
            </div>
            <div>
              <Icon name="heroicons:signal" class="w-10 h-10 mx-auto mb-2 text-green-400" />
              <div class="text-sm text-gray-300">MQTT</div>
            </div>
            <div>
              <Icon name="heroicons:bolt" class="w-10 h-10 mx-auto mb-2 text-yellow-400" />
              <div class="text-sm text-gray-300">Zigbee / Z-Wave</div>
            </div>
            <div>
              <Icon name="heroicons:cloud" class="w-10 h-10 mx-auto mb-2 text-blue-400" />
              <div class="text-sm text-gray-300">AWS IoT Core</div>
            </div>
            <div>
              <Icon name="heroicons:code-bracket" class="w-10 h-10 mx-auto mb-2 text-purple-400" />
              <div class="text-sm text-gray-300">Python / Node.js</div>
            </div>
            <div>
              <Icon name="heroicons:cpu-chip" class="w-10 h-10 mx-auto mb-2 text-orange-400" />
              <div class="text-sm text-gray-300">ESP32 / Arduino</div>
            </div>
            <div>
              <Icon name="heroicons:squares-2x2" class="w-10 h-10 mx-auto mb-2 text-pink-400" />
              <div class="text-sm text-gray-300">Node-RED</div>
            </div>
            <div>
              <Icon name="heroicons:chart-bar" class="w-10 h-10 mx-auto mb-2 text-cyan-400" />
              <div class="text-sm text-gray-300">InfluxDB / Grafana</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Approach -->
    <section class="section bg-gradient-to-b from-black to-gray-900">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center gradient-text">Our Approach</h2>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div class="card border-l-4 border-cyan-500">
            <h3 class="text-xl font-semibold mb-3 text-cyan-400">Privacy First</h3>
            <p class="text-gray-400">Local processing where possible. Your data stays in your home. No cloud dependencies unless you want them.</p>
          </div>

          <div class="card border-l-4 border-green-500">
            <h3 class="text-xl font-semibold mb-3 text-green-400">Open Standards</h3>
            <p class="text-gray-400">We build on open protocols (MQTT, Zigbee, Matter) so you're never locked into proprietary ecosystems.</p>
          </div>

          <div class="card border-l-4 border-purple-500">
            <h3 class="text-xl font-semibold mb-3 text-purple-400">Reliable & Tested</h3>
            <p class="text-gray-400">No flaky automations. Everything is tested in real-world conditions before deployment.</p>
          </div>

          <div class="card border-l-4 border-orange-500">
            <h3 class="text-xl font-semibold mb-3 text-orange-400">Easy to Maintain</h3>
            <p class="text-gray-400">Clean configuration, documentation, and training so you can manage and extend your system.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Example Projects -->
    <section class="section bg-gray-900">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center gradient-text">Example Projects</h2>

        <div class="space-y-6 max-w-4xl mx-auto">
          <div class="card bg-gradient-to-r from-gray-800 to-gray-900 border-cyan-500/30">
            <h3 class="text-xl font-semibold mb-2 text-white">Whole Home Automation</h3>
            <p class="text-gray-400 mb-4">Complete smart home setup with 40+ devices, presence-based automation, and voice control across 3 floors. Energy usage reduced by 30%.</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded text-sm">Home Assistant</span>
              <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">Zigbee</span>
              <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">Node-RED</span>
            </div>
          </div>

          <div class="card bg-gradient-to-r from-gray-800 to-gray-900 border-green-500/30">
            <h3 class="text-xl font-semibold mb-2 text-white">Industrial IoT Monitoring</h3>
            <p class="text-gray-400 mb-4">Real-time equipment monitoring for manufacturing facility. Predictive maintenance alerts reduced downtime by 45%.</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded text-sm">MQTT</span>
              <span class="px-3 py-1 bg-orange-500/20 text-orange-300 rounded text-sm">InfluxDB</span>
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded text-sm">Grafana</span>
            </div>
          </div>

          <div class="card bg-gradient-to-r from-gray-800 to-gray-900 border-purple-500/30">
            <h3 class="text-xl font-semibold mb-2 text-white">Custom Environmental Sensors</h3>
            <p class="text-gray-400 mb-4">Network of ESP32-based sensors monitoring temperature, humidity, CO2, and air quality across office space with real-time dashboards.</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">ESP32</span>
              <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">AWS IoT</span>
              <span class="px-3 py-1 bg-pink-500/20 text-pink-300 rounded text-sm">React Dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section bg-gradient-to-br from-cyan-900/20 to-purple-900/20">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-6 gradient-text">Ready to Automate Your Space?</h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Let's discuss your smart home or IoT project. From small automation tweaks to complete system deployments.
        </p>
        <NuxtLink to="/contact" class="btn-primary inline-flex items-center gap-2">
          Get Started
          <Icon name="heroicons:arrow-right" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'IoT & Home Automation Services - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Smart home automation and IoT solutions. Home Assistant, custom sensors, energy monitoring, and intelligent automation that respects your privacy.',
    },
  ],
})
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%);
}

.gradient-text {
  background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 50%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card {
  @apply bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300;
}

.btn-primary {
  @apply bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-cyan-500/50;
}
</style>
