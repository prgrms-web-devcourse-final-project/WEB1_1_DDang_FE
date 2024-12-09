import { useEffect, useRef } from 'react'

export function useScrollToBottom<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [])

  return ref
}
