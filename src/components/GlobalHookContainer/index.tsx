import { ReactNode } from 'react'
import useSubscribe from '~hooks/useSubscribe'
import useToken from '~hooks/useToken'

export default function GlobalHookContainer({ children }: { children: ReactNode }) {
  useToken()
  useSubscribe()
  return <>{children}</>
}
