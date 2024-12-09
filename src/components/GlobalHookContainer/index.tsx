import { ReactNode } from 'react'
import useClearModal from '~hooks/useClearModal'
import useSubscribe from '~hooks/useSubscribe'
import useToken from '~hooks/useToken'

export default function GlobalHookContainer({ children }: { children: ReactNode }) {
  useToken()
  useSubscribe()
  useClearModal()
  return <>{children}</>
}
