import { useEffect } from 'react'
import * as S from './styles'
import { useModalStore } from '~stores/modalStore'

export default function ModalContainer() {
  const { modalList, popModal } = useModalStore()

  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, '', window.location.href)
      popModal()
      return true
    }

    if (modalList.length > 0) {
      window.history.pushState(null, '', window.location.href)
      window.addEventListener('popstate', preventBack)
    }
    return () => window.removeEventListener('popstate', preventBack)
  }, [modalList])

  return <>{modalList.length ? <S.ModalWrapper>{...modalList}</S.ModalWrapper> : null}</>
}
