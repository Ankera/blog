import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
  ],
  resolve: {
    alias: [
      {
        find: /^~/,
        replacement: '',
      },
    ],
  },
  css: {
    preprocessorOptions: {
      less: {
        // 支持less，默认false
        javascriptEnabled: true,
      },
    },
  },
})
