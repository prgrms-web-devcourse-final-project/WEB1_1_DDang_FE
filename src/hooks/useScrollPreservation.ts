import { useEffect, useRef, useState } from 'react'

type useScrollPreservationProps = {
  dependency: unknown[]
}

export function useScrollPreservation<T extends HTMLElement>({ dependency }: useScrollPreservationProps) {
  const elementRef = useRef<T>(null)
  const [prevScrollHeight, setPrevScrollHeight] = useState(0)

  const preserveScroll = () => {
    if (elementRef.current) {
      setPrevScrollHeight(elementRef.current.scrollHeight)
    }
  }

  useEffect(() => {
    if (elementRef.current) {
      const { scrollHeight, scrollTop } = elementRef.current
      const nextScrollTop = scrollHeight - prevScrollHeight + scrollTop
      elementRef.current.scrollTop = nextScrollTop
    }
  }, [prevScrollHeight, ...dependency])

  return { elementRef, preserveScroll }
}
