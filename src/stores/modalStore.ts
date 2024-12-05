import { ReactNode } from 'react'
import { create } from 'zustand'

interface ModalStore {
  modalList: ReactNode[]
  pushModal: (modal: ReactNode) => void
  popModal: () => void
  clearModal: () => void
}

export const useModalStore = create<ModalStore>((set, get) => ({
  modalList: [],
  pushModal: modal => {
    set(state => ({
      modalList: [...state.modalList, modal],
    }))
    // 모달이 추가될 때 새로운 히스토리 항목 생성
    if (get().modalList.length > 0) {
      window.history.pushState({ modal: true }, '', window.location.href)
    }
  },
  popModal: () => {
    // 모달이 제거될 때 히스토리 뒤로가기
    if (get().modalList.length > 0) {
      window.history.back()
    }
    set(state => ({
      modalList: state.modalList.slice(0, -1),
    }))
  },
  clearModal: () => {
    set({ modalList: [] })
    // 모든 모달 제거 시 히스토리 초기화
    const modalCount = get().modalList.length
    if (modalCount) window.history.go(-modalCount)
  },
}))
