import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'
import dts from 'vite-plugin-dts'
import mkcert from 'vite-plugin-mkcert'
import { compression } from 'vite-plugin-compression2'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      port: 3000,
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
          enabled: false,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        },
      }),
    ],
  }
})
