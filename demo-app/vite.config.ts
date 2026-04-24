import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

const libraryEntry = fileURLToPath(new URL('../src/index.ts', import.meta.url))
const repoRoot = fileURLToPath(new URL('..', import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: './',
  build: {
    cssMinify: 'esbuild',
  },
  plugins: [react()],
  server: {
    fs: {
      allow: [repoRoot],
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@brainminds-dataportal/vol-renderer': libraryEntry,
    },
  },
})
