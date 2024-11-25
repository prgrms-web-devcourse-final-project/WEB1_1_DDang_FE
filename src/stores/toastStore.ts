import { create } from 'zustand'

interface ToastStore {
  content: string
  isVisible: boolean
  showToast: (newContent: string) => void
  hideToast: () => void
}

export const useToastStore = create<ToastStore>()(set => ({
  content: '',
  isVisible: false,
  showToast: (newContent: string) => set({ content: newContent, isVisible: true }),
  hideToast: () => set(state => ({ ...state, isVisible: false })),
}))
