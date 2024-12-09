import * as S from './styles'
import { useEffect } from 'react'
import { useToastStore } from '~/stores/toastStore'

export default function Toast() {
  const { content, isVisible, hideToast } = useToastStore()

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        hideToast()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  return (
    <S.ToastWrapper $isVisible={isVisible}>
      <S.Toast>{content}</S.Toast>
    </S.ToastWrapper>
  )
}
