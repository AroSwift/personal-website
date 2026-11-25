/// <reference types="vitest" />
import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// Plugin to inject build version into service worker
function swVersionPlugin(): Plugin {
  let outDir = 'dist'
  return {
    name: 'sw-version',
    configResolved(config) {
      // Resolve the real output directory rather than assuming `dist`.
      outDir = config.build.outDir
    },
    generateBundle() {
      // Generate a unique version based on timestamp (format: v3-YYYYMMDD-HHMMSS)
      const now = new Date()
      const dateStr = now
        .toISOString()
        .slice(0, 19)
        .replace(/[:-]/g, '')
        .replace('T', '-')
      const version = `v3-${dateStr}`

      // Read the service worker from public directory
      const swPath = join(process.cwd(), 'public', 'service-worker.js')
      let swContent = readFileSync(swPath, 'utf-8')

      // Replace the BUILD_VERSION placeholder
      swContent = swContent.replace(/BUILD_VERSION/g, version)

      // Write into the resolved output directory
      writeFileSync(
        join(process.cwd(), outDir, 'service-worker.js'),
        swContent,
        'utf-8'
      )
    },
    closeBundle() {
      // Fail the build rather than shipping the unsubstituted placeholder.
      // This plugin writes during `generateBundle` while Vite copies publicDir
      // at `renderStart`, so the write currently lands last. That ordering is
      // undocumented: if it ever flips, the copy clobbers this file and
      // production ships CACHE_VERSION = 'BUILD_VERSION', silently breaking
      // cache busting. Checking here, after the whole build, catches that.
      const distSwPath = join(process.cwd(), outDir, 'service-worker.js')
      if (readFileSync(distSwPath, 'utf-8').includes('BUILD_VERSION')) {
        throw new Error(
          `sw-version: ${distSwPath} still contains the BUILD_VERSION placeholder`
        )
      }
    },
  }
}

export default defineConfig({
  publicDir: 'public', // Ensure service-worker.js is copied to dist
  plugins: [
    tailwindcss(),
    react(),
    swVersionPlugin(),
    // Set VITE_OPEN_BUNDLE_STATS=1 to generate and open the bundle stats.
    // Gated so the bundle map is never emitted into a production dist/,
    // which nginx would otherwise serve publicly at /stats.html.
    ...(process.env.VITE_OPEN_BUNDLE_STATS === '1'
      ? [
          visualizer({
            filename: 'dist/stats.html',
            open: true,
            gzipSize: true,
          }),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => {
          // Router and navigation (check before generic react)
          if (
            id.includes('/node_modules/react-router-dom/') ||
            id.includes('/node_modules/react-router/')
          ) {
            return 'router'
          }

          // Core React libraries (exact package boundaries so lucide-react / @radix-ui don't match)
          if (
            id.includes('/node_modules/react/') ||
            id.includes('/node_modules/react-dom/') ||
            id.includes('/node_modules/scheduler/')
          ) {
            return 'react-core'
          }

          // UI component libraries
          if (
            id.includes('/node_modules/@radix-ui/') ||
            id.includes('/node_modules/lucide-react/')
          ) {
            return 'ui-components'
          }

          // Animation library - separate framer-motion & motion-dom
          if (
            id.includes('/node_modules/framer-motion/') ||
            id.includes('/node_modules/motion-dom/') ||
            id.includes('/node_modules/motion-utils/')
          ) {
            return 'animations'
          }

          // Utility libraries
          if (
            id.includes('/node_modules/clsx/') ||
            id.includes('/node_modules/class-variance-authority/') ||
            id.includes('/node_modules/tailwind-merge/')
          ) {
            return 'utils'
          }

          // Page-specific chunks for better code splitting
          if (id.includes('/src/pages/HomePage')) {
            return 'page-home'
          }
          if (id.includes('/src/pages/AboutPage')) {
            return 'page-about'
          }
          if (id.includes('/src/pages/ProjectsPage')) {
            return 'page-projects'
          }
          if (id.includes('/src/pages/ContactPage')) {
            return 'page-contact'
          }
          if (id.includes('/src/pages/NotFoundPage')) {
            return 'page-404'
          }

          // Layout components
          if (id.includes('/src/components/layout/')) {
            return 'layout'
          }

          // Common components
          if (
            id.includes('/src/components/') &&
            !id.includes('/src/components/layout/')
          ) {
            return 'components'
          }

          // Utility functions and hooks
          if (id.includes('/src/lib/')) {
            return 'lib'
          }

          // Vendor chunk for other dependencies
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: () => {
          return `assets/[name]-[hash].js`
        },
        // Optimize entry file naming
        entryFileNames: 'assets/[name]-[hash].js',
        // Optimize asset naming
        assetFileNames: assetInfo => {
          if (!assetInfo.name) {
            return 'assets/[name]-[hash].[ext]'
          }
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/\.(css)$/.test(assetInfo.name)) {
            return `assets/[name]-[hash].${ext}`
          }
          return `assets/[name]-[hash].${ext}`
        },
      },
    },
    chunkSizeWarningLimit: 500, // Lower threshold for better chunk management
    sourcemap: false,
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@radix-ui/react-slot',
      'lucide-react',
    ],
    exclude: ['@vite/client', '@vite/env'],
  },
  server: {
    port: 5173,
    host: true,
    hmr: {
      port: 5173,
    },
  },
  test: {
    globals: true,
    pool: 'threads', // Vitest 5 forks pool calls child.channel.unref(), unsupported under Bun
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.tsx'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
