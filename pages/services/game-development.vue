<template>
  <div>
    <PageHero
      eyebrow="Game Development"
      title="Games Built for"
      highlight="Handheld PCs and Switch"
      subtitle="We develop Windows and Linux games designed from the first prototype for Steam Deck, ROG Ally and Legion Go, with Nintendo Switch versions scoped inside the platform's budgets."
    >
      <NuxtLink to="/contact" class="btn btn-primary">Get in Touch</NuxtLink>
      <a href="#platforms" class="btn btn-secondary">See Platforms</a>
    </PageHero>

    <PageSection
      id="platforms"
      :alt="true"
      title="Target"
      highlight="Platforms"
      subtitle="One codebase, four power and thermal envelopes. We tune every build on the device."
    >
      <div class="grid md:grid-cols-2 gap-6 max-w-5xl">
        <FeatureCard
          v-for="platform in platforms"
          :key="platform.title"
          :title="platform.title"
          :icon="platform.icon"
          :description="platform.description"
          :items="platform.items"
        />
      </div>
    </PageSection>

    <PageSection
      title="How We"
      highlight="Build"
      subtitle="Six practices, each with a bar we hold every build to."
    >
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        <FeatureCard
          v-for="practice in practices"
          :key="practice.title"
          :title="practice.title"
          :icon="practice.icon"
          :description="practice.description"
          :items="practice.items"
        />
      </div>
    </PageSection>

    <PageSection :alt="true" title="From Prototype to" highlight="Release">
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl">
        <div v-for="(step, index) in steps" :key="step.title" class="card">
          <div class="icon-tile font-mono font-bold mb-4">{{ index + 1 }}</div>
          <h3 class="text-lg font-semibold mb-2">{{ step.title }}</h3>
          <p class="text-text-secondary">{{ step.description }}</p>
        </div>
      </div>
    </PageSection>

    <PageSection title="Engines and" highlight="Tooling">
      <div class="card max-w-3xl">
        <p class="text-text-secondary">
          We work in the engine and language each game calls for. Handheld work lives in the renderer, input and build layers, so the same practices apply across these stacks.
        </p>
        <div class="mt-4 flex flex-wrap gap-2">
          <span v-for="tool in tooling" :key="tool" class="tag">{{ tool }}</span>
        </div>
      </div>
    </PageSection>

    <PageSection :alt="true">
      <div class="card max-w-3xl">
        <h2 class="text-2xl md:text-3xl font-bold mb-3">Building for Handhelds Too?</h2>
        <p class="text-text-secondary mb-6">
          Publishers, platform partners and fellow developers: we are glad to compare notes.
        </p>
        <NuxtLink to="/contact" class="btn btn-primary">Get in Touch</NuxtLink>
      </div>
    </PageSection>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Game Development for Handheld PCs and Switch - Blackout Industries',
  meta: [
    {
      name: 'description',
      content: 'Blackout Industries develops Windows and Linux games built for Steam Deck, ROG Ally, Legion Go and Nintendo Switch. Performance, battery and Deck Verified criteria tuned on the device.'
    }
  ]
})

const platforms = [
  {
    title: 'Steam Deck',
    icon: 'heroicons:cpu-chip',
    description: 'SteamOS on Linux, 1280x800 display. Native Linux build or the Windows build through Proton.',
    items: [
      'Built to meet Deck Verified criteria',
      'Native Vulkan build, Proton as the fallback',
      '30, 40 or 60 fps caps matched to the refresh rate'
    ]
  },
  {
    title: 'ROG Ally',
    icon: 'heroicons:bolt',
    description: 'Windows 11 handheld with a 1080p 120 Hz variable refresh panel.',
    items: [
      'Graphics presets from 720p to 1080p',
      'Controller-first UI with Steam Input and XInput',
      'Sustained performance at a fixed power limit'
    ]
  },
  {
    title: 'Legion Go',
    icon: 'heroicons:squares-2x2',
    description: 'Windows 11 handheld with a 2560x1600 144 Hz panel.',
    items: [
      'Resolution scaling that keeps text legible',
      'Detachable controller and touch input paths',
      'Thermal testing under sustained load'
    ]
  },
  {
    title: 'Nintendo Switch',
    icon: 'heroicons:puzzle-piece',
    description: "Separate handheld and docked performance profiles. Switch versions are scoped inside the platform's CPU, GPU and memory budgets from the start.",
    items: [
      'Budgets per mode, set before content lock',
      'Dynamic resolution and load-time targets',
      'Certification requirements tracked from the first milestone'
    ]
  }
]

const practices = [
  {
    title: 'Handheld-First Performance',
    icon: 'heroicons:chart-bar',
    description: 'We profile on the device from the first prototype: frame pacing, CPU and GPU budgets, and shader precompilation against first-run stutter. Our bar: the target frame rate holds in every profiled scene.'
  },
  {
    title: 'Battery and Thermal Budgets',
    icon: 'heroicons:fire',
    description: 'We set a target frame rate at a fixed power limit, test at sustained clocks and measure battery runtime per scene. Our bar: the frame cap holds at the agreed power limit.'
  },
  {
    title: 'Deck Verified by Design',
    icon: 'heroicons:shield-check',
    description: "We build against the Verified criteria on Valve's compatibility page from the start. Valve runs the review and assigns the final rating. Suspend and resume handling and cloud saves are Valve recommendations, not Verified criteria; we cover them too. Our bar: every criterion below passes on the device.",
    items: [
      'Steam Deck controls supported, with a default configuration that reaches all content',
      'On-screen glyphs match the active input: Deck, Steam Controller or Xbox',
      'On-screen keyboard opens for controller players wherever text entry is needed',
      'Supported resolution, 1280x800 preferred or 1280x720; smallest text at least 9 px at 1280x800, 12 px recommended',
      'Default configuration playable at 30 fps at 800p',
      'Any launcher fully navigable with a controller',
      'Native Linux build, or the Windows build running through Proton'
    ]
  },
  {
    title: 'Native Linux and Proton',
    icon: 'lucide:container',
    description: 'We ship a native Vulkan and SDL build on the Steam Linux Runtime and validate the Windows build on Proton stable and Experimental as the fallback. Anti-cheat and middleware are checked before they go in. Our bar: the game runs on SteamOS without workarounds.'
  },
  {
    title: 'Windows Handheld Integration',
    icon: 'heroicons:signal',
    description: 'Our Windows builds carry graphics presets from 720p to 1600p, variable refresh, Steam Input and XInput, with suspend and resume handled as best practice. Our bar: each preset holds its frame target on ROG Ally and Legion Go.'
  },
  {
    title: 'Build Pipeline',
    icon: 'heroicons:server-stack',
    description: 'Windows and Linux CI builds every change, SteamPipe depots carry every release, and each upload is smoke tested on the device first. Our bar: every upload passes a device smoke test.'
  }
]

const steps = [
  {
    title: 'Prototype on the Device',
    description: 'We prototype on each target handheld from day one, so frame time, power and input problems surface before content is locked.'
  },
  {
    title: 'Set the Budgets',
    description: 'We set frame rate, power and memory budgets per device, plus the Verified criteria every build has to meet.'
  },
  {
    title: 'Tune Every Milestone',
    description: 'We profile every milestone build on the device and fix the most expensive problems first.'
  },
  {
    title: 'Verify Before Release',
    description: 'We check every release candidate on the device against the Verified criteria and our own budgets before it ships.'
  }
]

const tooling = ['Unity', 'Unreal Engine', 'C++', 'Rust', 'Vulkan', 'SDL', 'Proton', 'Steamworks']
</script>
