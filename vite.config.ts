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
      proxy: {
        '/api/ors': {
          target: 'http://112.162.84.70:8003',
          changeOrigin: true,
          secure: false,
          rewrite: path => path.replace(/^\/api\/ors/, '/ors'),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
          },
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              console.log('프록시 에러:', err)
            })
            proxy.on('proxyReq', (proxyReq, req, _res) => {
              // POST 요청의 경우 content-length 헤더 재설정
              if (req.method === 'POST') {
                let bodyData = ''
                req.on('data', chunk => {
                  bodyData += chunk.toString()
                })
                req.on('end', () => {
                  if (bodyData) {
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
                    proxyReq.setHeader('Content-Type', 'application/json')
                    proxyReq.write(bodyData)
                  }
                })
              }
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
          start_url: '/',
          description: '반려견 산책 서비스',
          theme_color: '#783D16', //?
          background_color: '#783D16', //?
          display: 'standalone',
          categories: ['lifestyle', 'pets'],
          icons: [
            {
              src: '/icons/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/icons/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/icons/maskable-icon-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
            {
              src: '/icons/apple-touch-icon-180x180.png',
              sizes: '180x180',
              type: 'image/png',
              purpose: 'apple touch icon',
            },
            {
              src: '/icons/pwa-64x64.png',
              sizes: '64x64',
              type: 'image/png',
            },
          ],
        },

        useCredentials: true,
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
