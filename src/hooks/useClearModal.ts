import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useModalStore } from '~stores/modalStore'

export default function useClearModal() {
  const { pathname } = useLocation()
  const { clearModal } = useModalStore()
  useEffect(() => {
    clearModal()
  }, [pathname])
}
