import { ReactNode } from 'react'
import { create } from 'zustand'

interface ModalStore {
  modalList: ReactNode[]
  pushModal: (modal: ReactNode) => void
  popModal: () => void
  clearModal: () => void
}

export const useModalStore = create<ModalStore>(set => ({
  modalList: [],
  pushModal: modal =>
    set(state => ({
      modalList: [...state.modalList, modal],
    })),
  popModal: () =>
    set(state => ({
      modalList: state.modalList.slice(0, -1),
    })),
  clearModal: () => set({ modalList: [] }),
}))
