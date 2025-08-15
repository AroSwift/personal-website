import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.tsx'],
  },
  build: {
    // Optimize build for production
    target: 'es2015',
    outDir: 'dist',
    assetsDir: 'assets',
    // Disable source maps for smaller builds
    sourcemap: false,
    // Optimize chunk splitting to reduce duplicate modules
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate vendor chunks to avoid duplicates
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'vendor-ui';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            // Group other node_modules into a single vendor chunk
            return 'vendor';
          }
          // Keep application code separate
          if (id.includes('src/components')) {
            return 'components';
          }
          if (id.includes('src/pages')) {
            return 'pages';
          }
        },
        // Optimize chunk size with better naming
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
      // Enhanced tree shaking to remove unused code
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false,
        tryCatchDeoptimization: false,
      },
    },
    // Enhanced minification settings
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: [
          'console.log',
          'console.info',
          'console.debug',
          'console.warn',
          'console.error',
        ],
        passes: 3,
        // More aggressive compression
        dead_code: true,
        global_defs: {
          '@alert': 'alert',
        },
        hoist_funs: true,
        hoist_props: true,
        hoist_vars: true,
        if_return: true,
        inline: true,
        join_vars: true,
        loops: true,
        negate_iife: true,
        properties: true,
        reduce_funcs: true,
        reduce_vars: true,
        sequences: true,
        side_effects: true,
        switches: true,
        typeofs: true,
        unsafe: true,
        unsafe_comps: true,
        unsafe_Function: true,
        unsafe_math: true,
        unsafe_proto: true,
        unsafe_regexp: true,
        unsafe_undefined: true,
        unused: true,
      },
      mangle: {
        toplevel: true,
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    // Optimize CSS
    cssCodeSplit: true,
    // Reduce chunk size warnings threshold
    chunkSizeWarningLimit: 500,
  },
  // Enhanced dependency optimization
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@radix-ui/react-icons',
      '@radix-ui/react-slot',
      'lucide-react',
      'framer-motion',
    ],
    exclude: [],
    // Force pre-bundling of dependencies
    force: true,
  },
});
