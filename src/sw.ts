/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

const EXCLUDED_PATHS = ['/sitemap.xml']

/** @type {RegExp[] | undefined} */
let allowlist
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV) allowlist = [/^\/$/]

// to allow work offline
registerRoute(
  new NavigationRoute(
    createHandlerBoundToURL('index.html'),
    {
      allowlist,
      denylist: EXCLUDED_PATHS.map(path => new RegExp(path))
    }
  )
)

registerRoute(
  ({ request, url }) => {
    if (url.pathname.endsWith('sitemap.xml')) {
      return false
    }
    return request.destination === 'style' ||
           request.destination === 'script' ||
           request.destination === 'image'
  },
  new CacheFirst({
    cacheName: 'static-assets'
  })
)

// 다른 모든 요청에 대한 네트워크 우선 전략
registerRoute(
  ({ url }) => {
    return !url.pathname.endsWith('sitemap.xml')
  },
  new NetworkFirst({
    cacheName: 'dynamic-content'
  })
)