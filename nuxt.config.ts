// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    '@vueuse/nuxt',
    'nuxt-icon'
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Blackout Industries - DevOps & 3D Printing Consulting',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'DevOps consulting, platform engineering, and precision 3D printing for modern teams.' },
        { name: 'theme-color', content: '#0A0A0A' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  nitro: {
    preset: 'static'
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  devtools: { enabled: true },

  compatibilityDate: '2025-01-01'
})
