<template>
  <div>
    <!-- Hero Section -->
    <section class="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <!-- Animated Background -->
      <div class="absolute inset-0 bg-gradient-to-br from-dark via-dark-100 to-dark opacity-90"></div>
      <div class="absolute inset-0 animated-gradient opacity-10"></div>

      <!-- Tactical Grid - Network Map with Random Connections -->
      <div class="absolute inset-0 opacity-75">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <!-- Gradient for connection lines -->
            <linearGradient id="conn-gradient-1">
              <stop offset="0%" style="stop-color:#FF6B00;stop-opacity:0.4">
                <animate attributeName="stop-opacity" values="0.4;0.7;0.4" dur="5.3s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style="stop-color:#FF8C33;stop-opacity:0.1">
                <animate attributeName="stop-opacity" values="0.1;0.3;0.1" dur="5.3s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            <linearGradient id="conn-gradient-2">
              <stop offset="0%" style="stop-color:#FF4500;stop-opacity:0.5">
                <animate attributeName="stop-opacity" values="0.5;0.8;0.5" dur="6.7s" repeatCount="indefinite" />
              </stop>
              <stop offset="100%" style="stop-color:#FFB366;stop-opacity:0.2">
                <animate attributeName="stop-opacity" values="0.2;0.4;0.2" dur="6.7s" repeatCount="indefinite" />
              </stop>
            </linearGradient>

            <!-- Node glow -->
            <radialGradient id="node-glow">
              <stop offset="0%" style="stop-color:#FF6B00;stop-opacity:0.6" />
              <stop offset="50%" style="stop-color:#FF8C33;stop-opacity:0.3" />
              <stop offset="100%" style="stop-color:#FFB366;stop-opacity:0" />
            </radialGradient>
          </defs>

          <!-- Dynamic connection lines -->
          <g>
            <line
              v-for="(conn, i) in connections"
              :key="`conn-${i}`"
              :x1="`${conn.from.x}%`"
              :y1="`${conn.from.y}%`"
              :x2="`${conn.to.x}%`"
              :y2="`${conn.to.y}%`"
              :stroke="`url(#conn-gradient-${conn.gradient})`"
              :stroke-width="conn.width"
              :opacity="conn.baseOpacity"
            >
              <animate
                attributeName="stroke-opacity"
                values="0.5;1;0.5"
                :dur="`${conn.duration}s`"
                repeatCount="indefinite"
              />
            </line>
          </g>

          <!-- Dynamic network nodes - render outside SVG for better compatibility -->
        </svg>

        <!-- Nodes rendered as HTML elements positioned absolutely -->
        <div class="absolute inset-0 pointer-events-none">
          <div
            v-for="(node, i) in nodes"
            :key="`node-${i}`"
            class="absolute"
            :style="{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)'
            }"
          >
            <!-- Glow halo -->
            <div
              class="absolute rounded-xl transition-opacity"
              :style="{
                width: `${node.glowSize * 3.6}px`,
                height: `${node.glowSize * 3.6}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                background: `radial-gradient(circle, ${node.color}60 0%, ${node.color}30 50%, transparent 100%)`,
                animation: `pulse-${i} ${node.duration}s ease-in-out infinite`
              }"
            ></div>

            <!-- Rounded box with icon -->
            <div
              class="relative w-9 h-9 rounded-lg flex items-center justify-center transition-opacity"
              :style="{
                backgroundColor: `${node.color}26`,
                border: `1.5px solid ${node.color}`,
                animation: `pulse-border-${i} ${node.duration}s ease-in-out infinite`
              }"
            >
              <Icon :name="node.icon" class="w-5 h-5" :style="{ color: node.color }" />
            </div>
          </div>
        </div>

        <!-- Dynamic keyframes for pulsing animations -->
        <component :is="'style'">
          <template v-for="(node, i) in nodes" :key="`style-${i}`">
            @keyframes pulse-{{ i }} {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 0.9; }
            }
            @keyframes pulse-border-{{ i }} {
              0%, 100% { opacity: 0.85; }
              50% { opacity: 1; }
            }
          </template>
        </component>
      </div>

      <!-- Content -->
      <div class="container-custom relative z-10 text-center py-20">
        <!-- Pixelation bubble backdrop - fitted to text with padding -->
        <div class="absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto w-[calc(100%-1rem)] md:w-[98%] lg:w-full max-w-[1400px] rounded-[2.5rem] backdrop-blur-sm bg-dark/20" style="padding: 3.5rem 3rem; min-height: 480px;"></div>

        <div class="animate-fade-in relative z-10">
          <h1 class="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">
            Engineering Infrastructure
            <span class="gradient-text block mt-2">That Scales</span>
          </h1>
          <p class="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto mb-8 text-balance">
            Kubernetes, Terraform, CI/CD pipelines. IoT edge compute. Low-latency multiplayer backends. Rapid prototyping.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#services" class="btn btn-primary text-lg">
              Explore Services
            </a>
            <NuxtLink to="/contact" class="btn btn-secondary text-lg">
              Get in Touch
            </NuxtLink>
          </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="heroicons:chevron-down" class="w-8 h-8 text-primary" />
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section id="services" class="section bg-dark-100">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Our <span class="gradient-text">Services</span>
          </h2>
          <p class="text-lg text-text-secondary max-w-2xl mx-auto">
            From cloud infrastructure to smart homes, game backends to physical prototypes—we deliver precision at scale.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <ServiceCard
            icon="heroicons:server-stack"
            title="DevOps Consulting"
            description="Build resilient, scalable infrastructure with expert guidance. From Kubernetes to CI/CD pipelines."
            link="/services/devops-consulting"
            variant="accent"
            :features="[
              'Cloud infrastructure design',
              'Kubernetes & containerization',
              'CI/CD pipeline automation',
              'Monitoring & observability'
            ]"
          />

          <ServiceCard
            icon="heroicons:cube-transparent"
            title="3D Printing Services"
            description="Turn digital designs into physical reality. Rapid prototyping and custom manufacturing."
            link="/services/3d-printing"
            variant="secondary"
            :features="[
              'Rapid prototyping',
              'Custom part manufacturing',
              'CAD model optimization',
              'Multi-material printing'
            ]"
          />

          <ServiceCard
            icon="heroicons:home-modern"
            title="IoT & Home Automation"
            description="Smart home solutions that integrate seamlessly. From concept to deployment."
            link="/services/iot-home-automation"
            variant="primary"
            :coming-soon="true"
            :features="[
              'Smart lighting & climate',
              'Security & monitoring',
              'Energy optimization',
              'Privacy-first architecture'
            ]"
          />

          <ServiceCard
            icon="heroicons:puzzle-piece"
            title="Game Development"
            description="From indie prototypes to production multiplayer systems and game infrastructure."
            link="/services/game-development"
            variant="accent"
            :coming-soon="true"
            :features="[
              'Multiplayer backends',
              'Low-latency networking',
              'Engine development',
              'DevOps for game studios'
            ]"
          />
        </div>
      </div>
    </section>

    <!-- TechStack Showcase -->
    <TechStack />

    <!-- Why Blackout Industries -->
    <section class="section">
      <div class="container-custom">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-5xl font-bold mb-4">
            Why <span class="gradient-text">Blackout Industries</span>
          </h2>
          <p class="text-lg text-text-secondary max-w-2xl mx-auto">
            We combine technical excellence with rapid execution to transform your vision into reality.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:sparkles" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Technical Excellence</h3>
            <p class="text-text-secondary">Deep expertise in cloud-native architectures and modern engineering practices.</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-accent to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:rocket-launch" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">Rapid Execution</h3>
            <p class="text-text-secondary">Deliver MVPs in weeks, not months. We move fast without compromising quality.</p>
          </div>

          <div class="card text-center">
            <div class="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:hand-raised" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-xl font-bold mb-2">End-to-End Support</h3>
            <p class="text-text-secondary">From strategy to implementation and beyond—we're with you every step.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section bg-dark-100">
      <div class="container-custom">
        <div class="card glass text-center max-w-4xl mx-auto p-12 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-50"></div>
          <div class="relative z-10">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Infrastructure?
            </h2>
            <p class="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you build, scale, and optimize your systems.
            </p>
            <NuxtLink to="/contact" class="btn btn-primary text-lg">
              Schedule a Consultation
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

useHead({
  title: 'Blackout Industries - DevOps, IoT, Game Dev & 3D Printing',
  meta: [
    {
      name: 'description',
      content: 'Kubernetes, Terraform, CI/CD. IoT edge compute. Low-latency game backends. Rapid prototyping. Engineering infrastructure that scales.'
    }
  ]
})

// Random network map generation
interface Node {
  x: number
  y: number
  size: number
  glowSize: number
  color: string
  duration: number
  icon: string
}

interface Connection {
  from: Node
  to: Node
  gradient: number
  width: number
  duration: number
  isMainRoute: boolean
  baseOpacity: number
}

const nodes = ref<Node[]>([])
const connections = ref<Connection[]>([])

const colors = ['#FF6B00', '#FF8C33', '#FFB366', '#FF4500']

// Cloud infrastructure icons
const cloudIcons = [
  'heroicons:server-stack',
  'heroicons:circle-stack', // Database
  'heroicons:cpu-chip', // Redis/Cache
  'heroicons:cube', // Container
  'heroicons:cloud', // Cloud service
  'heroicons:globe-alt', // CDN/Network
  'heroicons:shield-check', // Security
  'heroicons:lock-closed', // Auth
  'heroicons:bolt', // Lambda/Functions
  'heroicons:arrow-path', // Load balancer
]

function generateNetwork() {
  // Random number of nodes (8-15)
  const nodeCount = Math.floor(Math.random() * 8) + 8

  // Generate nodes avoiding center bubble
  const newNodes: Node[] = []
  const centerExclusionZone = {
    xMin: 25,
    xMax: 75,
    yMin: 25,
    yMax: 75
  }

  for (let i = 0; i < nodeCount; i++) {
    let x, y
    let attempts = 0

    // Generate position outside center exclusion zone
    do {
      x = Math.random() * 85 + 10 // 10-95%
      y = Math.random() * 70 + 15 // 15-85%
      attempts++
    } while (
      attempts < 50 && // Prevent infinite loop
      x > centerExclusionZone.xMin &&
      x < centerExclusionZone.xMax &&
      y > centerExclusionZone.yMin &&
      y < centerExclusionZone.yMax
    )

    newNodes.push({
      x,
      y,
      size: Math.random() * 2 + 2.5, // 2.5-4.5
      glowSize: Math.random() * 5 + 7, // 7-12
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 4 + 5, // 5-9s
      icon: cloudIcons[Math.floor(Math.random() * cloudIcons.length)]
    })
  }

  // Generate connections with main route
  const newConnections: Connection[] = []

  // Create main route (3-5 sequential connections with full opacity)
  const mainRouteLength = Math.floor(Math.random() * 3) + 3 // 3-5 nodes in main route
  const usedNodes = new Set<Node>()
  let currentNode = newNodes[Math.floor(Math.random() * newNodes.length)]
  usedNodes.add(currentNode)

  for (let i = 0; i < mainRouteLength - 1; i++) {
    const availableNodes = newNodes.filter(n => !usedNodes.has(n))
    if (availableNodes.length === 0) break

    // Pick closest node for more organic route
    const nextNode = availableNodes[Math.floor(Math.random() * Math.min(3, availableNodes.length))]
    usedNodes.add(nextNode)

    newConnections.push({
      from: currentNode,
      to: nextNode,
      gradient: 1,
      width: 1.8, // Thicker for main route
      duration: Math.random() * 3 + 7, // Slower pulse
      isMainRoute: true,
      baseOpacity: 1.0
    })

    currentNode = nextNode
  }

  // Generate secondary connections (lower opacity)
  const connectionCount = Math.floor(Math.random() * 8) + 8 // 8-16 secondary connections

  for (let i = 0; i < connectionCount; i++) {
    const from = newNodes[Math.floor(Math.random() * newNodes.length)]
    const to = newNodes[Math.floor(Math.random() * newNodes.length)]

    if (from !== to) {
      newConnections.push({
        from,
        to,
        gradient: Math.random() > 0.5 ? 1 : 2,
        width: Math.random() * 0.6 + 0.7, // 0.7-1.3 (thinner)
        duration: Math.random() * 5 + 6, // 6-11s
        isMainRoute: false,
        baseOpacity: Math.random() * 0.3 + 0.2 // 0.2-0.5 (varied low opacity)
      })
    }
  }

  nodes.value = newNodes
  connections.value = newConnections
}

onMounted(() => {
  generateNetwork()
})
</script>
