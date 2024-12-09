import { create } from 'zustand'

interface PushNotification {
  id: number
  message: string
}

interface PushNotificationStore {
  notifications: PushNotification[]
  showNotification: (message: string) => void
  hideNotification: (id: number) => void
  clearNotification: () => void
}

export const usePushNotificationStore = create<PushNotificationStore>((set, get) => ({
  notifications: [],
  showNotification: (message: string) => {
    const id = Date.now()
    set(state => ({ notifications: [...state.notifications, { id, message }] }))
    setTimeout(() => get().hideNotification(id), 2000)
  },
  hideNotification: (id: number) => {
    set(state => ({
      notifications: state.notifications.filter(notification => notification.id !== id),
    }))
  },
  clearNotification: () => {
    set({ notifications: [] })
  },
}))
