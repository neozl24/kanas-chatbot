/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({
      tsconfigPath: resolve(__dirname, "tsconfig.app.json"),  // https://github.com/qmhc/vite-plugin-dts/issues/344
      include: ['lib'],
      insertTypesEntry: true,
    })],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'kanas-chatbot',
      fileName: 'kanas-chatbot',
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
        },
      }
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: resolve(__dirname, 'lib/test/setup.ts'),
  },
})
