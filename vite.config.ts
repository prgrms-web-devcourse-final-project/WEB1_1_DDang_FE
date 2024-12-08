import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import dts from 'vite-plugin-dts'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 3000,
      strictPort: true,
      proxy: {
        '^/ors/v2/directions/.*': {
          target: 'http://112.162.84.70:8003',
          changeOrigin: true,
          secure: false,
          rewrite: path => path,
          configure: (proxy, options) => {
            proxy.on('error', (err, req, res) => {
              console.log('프록시 에러:', err)
            })
            proxy.on('proxyReq', (proxyReq, req, res) => {
              console.log('프록시 요청:', proxyReq.path)
            })
          },
        },
      },
    },
    plugins: [
      react(),
      tsconfigPaths(),
      ...(mode === 'development' ? [mkcert()] : []),
      svgr(),
      dts(),
      compression(),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src',
        filename: 'sw.ts',
        registerType: 'autoUpdate',
        injectRegister: false,

        pwaAssets: {
          disabled: false,
          config: true,
        },

        manifest: {
          name: 'DDang',
          short_name: 'DDang',
          description: '반려견 산책 서비스',
          theme_color: '#783D16', //?
          background_color: '#783D16', //?
          display: 'standalone',
          icons: [
            {
              src: '/icons/android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icons/android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/icons/apple-touch-icon.png',
              sizes: '180x180',
              type: 'image/png',
            },
            {
              src: '/icons/favicon-16x16.png',
              sizes: '16x16',
              type: 'image/png',
            },
            {
              src: '/icons/favicon-32x32.png',
              sizes: '32x32',
              type: 'image/png',
            },
            {
              src: '/icons/favicon.ico',
              sizes: '48x48',
              type: 'image/x-icon',
            },
          ],
        },

        injectManifest: {
          globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        },

        devOptions: {
          enabled: true,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        },
      }),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
          },
        },
      },
    },
    define: {
      global: 'window',
    },
  }
})
