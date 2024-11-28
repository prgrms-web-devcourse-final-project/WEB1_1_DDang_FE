import { useEffect } from 'react'
import * as S from './styles'
import { useModalStore } from '~stores/modalStore'

export default function ModalContainer() {
  const { modalList, popModal } = useModalStore()

  useEffect(() => {
    if (modalList.length > 0) {
      window.history.pushState({ modal: true }, '', window.location.href)
    }

    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.modal) {
        popModal()
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [modalList, popModal])

  return <>{modalList.length ? <S.ModalWrapper>{...modalList}</S.ModalWrapper> : null}</>
}
