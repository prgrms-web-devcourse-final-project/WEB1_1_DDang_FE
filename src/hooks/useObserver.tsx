import { useRef, useCallback, useEffect } from 'react'

type UseObserverProps = {
  callback: () => void
}

export default function useObserver<T extends HTMLElement>({ callback }: UseObserverProps) {
  const observerRef = useRef<T>(null)
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [target] = entries
      if (target.isIntersecting) {
        callback()
      }
    },
    [callback]
  )

  useEffect(() => {
    const element = observerRef.current
    const option = { threshold: 0.5 }

    const observer = new IntersectionObserver(handleObserver, option)
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [handleObserver])

  return { observerRef }
}
