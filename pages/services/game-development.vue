<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section class="hero-gradient py-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 animate-pulse"></div>
      </div>
      <div class="container mx-auto px-6 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <Icon name="heroicons:puzzle-piece" class="w-20 h-20 mx-auto mb-6 text-purple-400" />
          <h1 class="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Game Development
          </h1>
          <p class="text-xl text-gray-300 mb-8 leading-relaxed">
            From indie prototypes to production-ready multiplayer systems. We build games, game engines, and backend infrastructure that scales.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section bg-black">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center gradient-text">What We Do</h2>

        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="card group">
            <Icon name="heroicons:cpu-chip" class="w-12 h-12 mb-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Game Backend Systems</h3>
            <p class="text-gray-400">Scalable multiplayer infrastructure, matchmaking, leaderboards, anti-cheat, and real-time game servers.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:globe-alt" class="w-12 h-12 mb-4 text-green-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Networking & Multiplayer</h3>
            <p class="text-gray-400">Low-latency netcode, dedicated servers, peer-to-peer systems, and state synchronization.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:wrench-screwdriver" class="w-12 h-12 mb-4 text-orange-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Engine Development</h3>
            <p class="text-gray-400">Custom engine features, tools, plugins, and performance optimization for Unity, Unreal, or custom engines.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:server-stack" class="w-12 h-12 mb-4 text-purple-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">DevOps for Games</h3>
            <p class="text-gray-400">CI/CD pipelines, automated testing, cloud deployment, and infrastructure as code for game studios.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:chart-bar" class="w-12 h-12 mb-4 text-pink-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Analytics & Telemetry</h3>
            <p class="text-gray-400">Player behavior tracking, performance monitoring, crash reporting, and A/B testing systems.</p>
          </div>

          <div class="card group">
            <Icon name="heroicons:shield-check" class="w-12 h-12 mb-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <h3 class="text-xl font-semibold mb-3 text-white">Game Security</h3>
            <p class="text-gray-400">Anti-cheat implementation, server hardening, DDoS mitigation, and secure authentication systems.</p>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="card bg-gradient-to-br from-gray-900 to-gray-800 border-purple-500/30">
          <h3 class="text-2xl font-semibold mb-6 text-center text-white">Technologies & Engines</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <Icon name="heroicons:puzzle-piece" class="w-10 h-10 mx-auto mb-2 text-purple-400" />
              <div class="text-sm text-gray-300">Unity</div>
            </div>
            <div>
              <Icon name="heroicons:cube" class="w-10 h-10 mx-auto mb-2 text-blue-400" />
              <div class="text-sm text-gray-300">Unreal Engine</div>
            </div>
            <div>
              <Icon name="heroicons:code-bracket-square" class="w-10 h-10 mx-auto mb-2 text-orange-400" />
              <div class="text-sm text-gray-300">Rust / C++</div>
            </div>
            <div>
              <Icon name="heroicons:server" class="w-10 h-10 mx-auto mb-2 text-green-400" />
              <div class="text-sm text-gray-300">Node.js / Go</div>
            </div>
            <div>
              <Icon name="heroicons:globe-alt" class="w-10 h-10 mx-auto mb-2 text-cyan-400" />
              <div class="text-sm text-gray-300">WebGL / Three.js</div>
            </div>
            <div>
              <Icon name="heroicons:signal" class="w-10 h-10 mx-auto mb-2 text-yellow-400" />
              <div class="text-sm text-gray-300">Photon / Mirror</div>
            </div>
            <div>
              <Icon name="heroicons:cloud" class="w-10 h-10 mx-auto mb-2 text-blue-500" />
              <div class="text-sm text-gray-300">AWS GameLift</div>
            </div>
            <div>
              <Icon name="heroicons:server-stack" class="w-10 h-10 mx-auto mb-2 text-indigo-400" />
              <div class="text-sm text-gray-300">Docker / K8s</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Specializations -->
    <section class="section bg-gradient-to-b from-black to-gray-900">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center gradient-text">Our Specializations</h2>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div class="card border-l-4 border-cyan-500">
            <h3 class="text-xl font-semibold mb-3 text-cyan-400">Multiplayer Architecture</h3>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Authoritative server design with client-side prediction</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Low-latency networking with UDP/QUIC protocols</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Region-based matchmaking and server scaling</span>
              </li>
            </ul>
          </div>

          <div class="card border-l-4 border-purple-500">
            <h3 class="text-xl font-semibold mb-3 text-purple-400">Performance Optimization</h3>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Profiling and bottleneck identification</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Memory optimization and garbage collection tuning</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>GPU rendering optimization and shader work</span>
              </li>
            </ul>
          </div>

          <div class="card border-l-4 border-orange-500">
            <h3 class="text-xl font-semibold mb-3 text-orange-400">Backend Services</h3>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Player accounts, inventory, and progression systems</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Matchmaking engines with skill-based rating</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Leaderboards, achievements, and social features</span>
              </li>
            </ul>
          </div>

          <div class="card border-l-4 border-pink-500">
            <h3 class="text-xl font-semibold mb-3 text-pink-400">Tools & Automation</h3>
            <ul class="space-y-2 text-gray-400">
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Custom Unity/Unreal editor tools and extensions</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Build automation and asset pipeline optimization</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <span>Automated testing frameworks for game logic</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Examples -->
    <section class="section bg-gray-900">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center gradient-text">Project Portfolio</h2>

        <div class="space-y-6 max-w-4xl mx-auto relative">
          <div class="absolute inset-0 backdrop-blur-sm bg-gray-900/60 z-10 flex items-center justify-center rounded-lg">
            <div class="text-center">
              <div class="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500 mb-4">
                Coming Soon
              </div>
              <p class="text-xl text-gray-300">Building our portfolio showcase</p>
            </div>
          </div>

          <div class="card bg-gradient-to-r from-gray-800 to-gray-900 border-purple-500/30 blur-sm">
            <h3 class="text-xl font-semibold mb-2 text-white">Multiplayer FPS Backend</h3>
            <p class="text-gray-400 mb-4">Scalable dedicated server infrastructure supporting 10,000+ concurrent players across 200+ game servers with real-time matchmaking.</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">Unity</span>
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded text-sm">Kubernetes</span>
              <span class="px-3 py-1 bg-orange-500/20 text-orange-300 rounded text-sm">Go</span>
              <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">AWS GameLift</span>
            </div>
          </div>

          <div class="card bg-gradient-to-r from-gray-800 to-gray-900 border-cyan-500/30 blur-sm">
            <h3 class="text-xl font-semibold mb-2 text-white">Browser-Based MMO</h3>
            <p class="text-gray-400 mb-4">WebGL-based massively multiplayer game with custom engine, 500+ simultaneous players per server, and real-time chat system.</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded text-sm">Three.js</span>
              <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded text-sm">Node.js</span>
              <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">WebSockets</span>
              <span class="px-3 py-1 bg-pink-500/20 text-pink-300 rounded text-sm">Redis</span>
            </div>
          </div>

          <div class="card bg-gradient-to-r from-gray-800 to-gray-900 border-orange-500/30 blur-sm">
            <h3 class="text-xl font-semibold mb-2 text-white">Mobile Game CI/CD Pipeline</h3>
            <p class="text-gray-400 mb-4">Automated build, test, and deployment system for Unity mobile game reducing release cycle from 2 weeks to 2 hours.</p>
            <div class="flex flex-wrap gap-2">
              <span class="px-3 py-1 bg-orange-500/20 text-orange-300 rounded text-sm">Unity</span>
              <span class="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">GitHub Actions</span>
              <span class="px-3 py-1 bg-green-500/20 text-green-300 rounded text-sm">FastLane</span>
              <span class="px-3 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">TestFlight</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Work With Us -->
    <section class="section bg-gradient-to-b from-gray-900 to-black">
      <div class="container mx-auto px-6">
        <h2 class="text-4xl font-bold mb-12 text-center gradient-text">Why Game Studios Choose Us</h2>

        <div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:bolt" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">Ship Faster</h3>
            <p class="text-gray-400">We handle the backend complexity so your team can focus on gameplay.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:arrow-trending-up" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">Scale Confidently</h3>
            <p class="text-gray-400">Infrastructure that grows with your player base without breaking.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:shield-check" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-semibold mb-2 text-white">Production Ready</h3>
            <p class="text-gray-400">Battle-tested code with monitoring, logging, and disaster recovery.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section bg-gradient-to-br from-purple-900/20 to-pink-900/20">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-6 gradient-text">Let's Build Something Epic</h2>
        <p class="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Whether you need backend infrastructure, multiplayer systems, or performance optimization - we've got you covered.
        </p>
        <NuxtLink to="/contact" class="btn-primary inline-flex items-center gap-2">
          Start Your Project
          <Icon name="heroicons:arrow-right" class="w-5 h-5" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Game Development Services - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Game backend development, multiplayer systems, DevOps for game studios. Unity, Unreal, custom engines. Scalable infrastructure for indie to AAA games.',
    },
  ],
})
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(135deg, #0a0a0a 0%, #2e1a3e 50%, #0a0a0a 100%);
}

.gradient-text {
  background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.card {
  @apply bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300;
}

.btn-primary {
  @apply bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold px-8 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/50;
}
</style>
