import { ReactNode } from 'react'
import { create } from 'zustand'

export type AnimationType = 'none' | 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight'

interface ModalItem {
  id: string
  content: ReactNode
  animationType?: AnimationType
}

interface ModalStore {
  modalList: ModalItem[]
  pushModal: (modal: ReactNode, animationType?: AnimationType) => void
  popModal: () => void
  clearModal: () => void
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modalList: [],
  pushModal: (content, animationType) => {
    const id = `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    set(state => ({
      modalList: [...state.modalList, { id, content, animationType }],
    }))
    if (get().modalList.length > 0) {
      window.history.pushState({ modal: true }, '', window.location.href)
    }
  },
  popModal: () => {
    set(state => ({
      modalList: state.modalList.slice(0, -1),
    }))
  },
  clearModal: () => {
    set({ modalList: [] })
    const modalCount = get().modalList.length
    if (modalCount) window.history.go(-modalCount)
  },
}))
