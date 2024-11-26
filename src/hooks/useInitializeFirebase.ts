import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { useEffect } from 'react'

export default function useInitializeFirebase() {
  useEffect(() => {
    const firebaseConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    }

    const app = initializeApp(firebaseConfig)
    const messaging = getMessaging(app)

    const requestPermission = async () => {
      console.log('Requesting permission...')
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        console.log('Notification permission granted.')
        const token = await getToken(messaging, { vapidKey: import.meta.env.VITE_VAPID_KEY })
        console.log('Token:', token)
        // 여기서 토큰을 서버로 전송
      } else {
        console.log('Unable to get permission to notify.')
      }
    }

    requestPermission()

    onMessage(messaging, payload => {
      console.log('Message received. ', payload)
      // 포그라운드 메시지 처리
    })
  }, [])
}
