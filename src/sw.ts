/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

// Workbox 관련 이벤트 리스너
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

// Precaching 설정
precacheAndRoute(self.__WB_MANIFEST)
cleanupOutdatedCaches()

// 개발 모드 allowlist 설정
let allowlist: RegExp[] | undefined
if (import.meta.env.DEV) allowlist = [/^\/$/]

// 오프라인 작동을 위한 라우트 등록
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html'), { allowlist }))
