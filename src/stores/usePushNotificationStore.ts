import { create } from 'zustand'

interface PushNotificationStore {
  pushNotification: string
  showNotification: (message: string) => void
  hideNotification: () => void
}

export const usePushNotificationStore = create<PushNotificationStore>(set => ({
  pushNotification: '',
  showNotification: (message: string) => {
    set({ pushNotification: message })
    setTimeout(() => set({ pushNotification: '' }), 2000)
  },
  hideNotification: () => {
    set({ pushNotification: '' })
  },
}))
