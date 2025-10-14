import { vi } from 'vitest'

// Mock Nuxt composables
global.useHead = vi.fn(() => {})
global.useSeoMeta = vi.fn(() => {})
global.useRoute = vi.fn(() => ({
  path: '/',
  params: {},
  query: {},
  hash: '',
  fullPath: '/',
  matched: [],
  meta: {},
  name: undefined,
  redirectedFrom: undefined
}))
global.useRouter = vi.fn(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  go: vi.fn(),
  back: vi.fn(),
  forward: vi.fn(),
  currentRoute: { value: global.useRoute() }
}))
global.navigateTo = vi.fn()
global.useNuxtApp = vi.fn(() => ({
  $router: global.useRouter(),
  $route: global.useRoute()
}))
