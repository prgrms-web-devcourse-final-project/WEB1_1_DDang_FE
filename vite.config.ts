import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { compression } from 'vite-plugin-compression2'
import dts from 'vite-plugin-dts'
// import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(() =>
  // { mode }
  {
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
        // ...(mode === 'development' ? [mkcert()] : []),
        svgr(),
        dts(),
        compression(),
        VitePWA({
          strategies: 'injectManifest',
          srcDir: 'src',
          filename: 'sw.ts',
          registerType: 'prompt',
          injectRegister: false,

          pwaAssets: {
            disabled: false,
            config: true,
          },

          manifest: {
            name: 'DDang',
            short_name: 'DDang',
            description: '반려견 산책 서비스',
            theme_color: '#ffffff',
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
    }
  }
)
