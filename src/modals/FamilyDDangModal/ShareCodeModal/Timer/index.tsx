import { useEffect, useState } from 'react'
import * as S from './styles'

interface TimerProps {
  time: number
  onTimeEnd: () => void
}

export function Timer({ time, onTimeEnd }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(time * 1000)

  useEffect(() => {
    setTimeLeft(time * 1000)
  }, [time])

  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60))
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, '0')

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1000)
    }, 1000)

    if (timeLeft <= 0) {
      clearInterval(timer)
      onTimeEnd()
    }

    return () => clearInterval(timer)
  }, [timeLeft, onTimeEnd])

  return (
    <S.Timer>
      {minutes}:{seconds}
    </S.Timer>
  )
}
