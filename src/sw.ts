/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'
import { NetworkFirst, CacheFirst } from 'workbox-strategies'

declare let self: ServiceWorkerGlobalScope

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

const EXCLUDED_PATHS = ['/sitemap.xml']

/** @type {RegExp[] | undefined} */
let allowlist

if (import.meta.env.DEV) allowlist = [/^\/$/]

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


registerRoute(
  ({ url }) => {
    return !url.pathname.endsWith('sitemap.xml')
  },
  new NetworkFirst({
    cacheName: 'dynamic-content'
  })
)