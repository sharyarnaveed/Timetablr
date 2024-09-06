import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({

  server:{
    proxy:{
      '/api':'http://localhost:3000'
    }
  },

  plugins: [
    vue(),
    VitePWA({
      registerType:'autoUpdate',
      manifest: {
        name: 'Timetablr',
        short_name: 'Timetablr',
        description: 'Your Time Simplified',
        theme_color: '#ffffff',
        start_url:'/home',
        icons: [
          {
            "src": "/pwa-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "any"
          },
          {
            "src": "/pwa-maskable-192x192.png",
            "sizes": "192x192",
            "type": "image/png",
            "purpose": "maskable"
          },
          {
            "src": "/pwa-maskable-512x512.png",
            "sizes": "512x512",
            "type": "image/png",
            "purpose": "maskable"
          }
          
        ],
        
        "display": "standalone",
        "background_color": "#FFFFFF",
       
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
