import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue', 'vitest'],
      dts: false
    })
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url))
    }
  },
  test: {
    include: ['tests/unit/**/*.spec.ts', 'tests/integration/**/*.spec.ts'],
    exclude: ['tests/e2e/**', 'node_modules/**'],
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['components/**/*.vue', 'pages/**/*.vue'],
      exclude: [
        'node_modules/',
        '.nuxt/',
        '.output/',
        'tests/',
        '**/*.spec.ts',
        '**/*.test.ts'
      ],
      thresholds: {
        lines: 50,
        functions: 50,
        branches: 50,
        statements: 50
      }
    }
  }
})
