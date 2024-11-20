import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import Sitemap from 'vite-plugin-sitemap'
import { compression } from 'vite-plugin-compression2'
import dts from 'vite-plugin-dts'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const baseUrl = mode === 'production' ? env.BASE_URL : 'https://localhost:3000'
  
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
          globIgnores: ['**/sitemap.xml'],
        },

        devOptions: {
          enabled: true,
          navigateFallback: 'index.html',
          suppressWarnings: true,
          type: 'module',
        },
      }),
      Sitemap({
        hostname: baseUrl,
        dynamicRoutes: [
          '/',
          '/log',
          '/login',
          '/walk',
          '/mypage'
        ],
        exclude: [],
        changefreq: 'weekly',
        priority: {
          '/': 1.0,
          '*': 0.8
        },
        lastmod: new Date(),
        outDir: mode === 'development' ? 'public' : 'dist',
        readable: true,
        robots: [
          {
            userAgent: '*',
            allow: [
              '/assets/',
              '/log/',
              '/walk/'
            ],
            disallow: [
              '/login',
              '/mypage'
            ]
          }
        ]
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
})
