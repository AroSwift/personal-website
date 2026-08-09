/// <reference types="vitest" />
import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react'
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
  define: {
    'import.meta.env.VITE_BUILD_VERSION': JSON.stringify(
      new Date().toISOString().replace(/[:.-]/g, '')
    ),
  },
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
          // Core React libraries
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-core'
          }

          // Router and navigation
          if (id.includes('react-router-dom')) {
            return 'router'
          }

          // UI component libraries
          if (id.includes('@radix-ui') || id.includes('lucide-react')) {
            return 'ui-components'
          }

          // Animation library - separate heavy framer-motion
          if (id.includes('framer-motion')) {
            return 'animations'
          }

          // Utility libraries
          if (
            id.includes('clsx') ||
            id.includes('class-variance-authority') ||
            id.includes('tailwind-merge')
          ) {
            return 'utils'
          }

          // Tailwind CSS and styling
          if (
            id.includes('tailwindcss') ||
            id.includes('tailwindcss-animate')
          ) {
            return 'styling'
          }

          // Page-specific chunks for better code splitting
          if (id.includes('/pages/HomePage')) {
            return 'page-home'
          }
          if (id.includes('/pages/AboutPage')) {
            return 'page-about'
          }
          if (id.includes('/pages/ProjectsPage')) {
            return 'page-projects'
          }
          if (id.includes('/pages/ContactPage')) {
            return 'page-contact'
          }
          if (id.includes('/pages/NotFoundPage')) {
            return 'page-404'
          }

          // Layout components
          if (id.includes('/components/layout/')) {
            return 'layout'
          }

          // Common components
          if (
            id.includes('/components/') &&
            !id.includes('/components/layout/')
          ) {
            return 'components'
          }

          // Utility functions and hooks
          if (id.includes('/lib/')) {
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
    minify: 'esbuild',
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
      '@radix-ui/react-icons',
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
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.tsx'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
})
