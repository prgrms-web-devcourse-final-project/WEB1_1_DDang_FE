import { useState, useRef, useEffect } from 'react'
import * as S from './styles'
import useCalendar from '~hooks/useCalendar'
import arrowDown from '~assets/arrow-down.svg'
import { useModalStore } from '~stores/modalStore'
import DatePickerModal from '~modals/DatePickerModal'
import { useWalkDates } from '~pages/LogPage/useWalkInfo'

interface CalendarProps {
  date: Date
  setDate: (date: Date) => void
}

export default function Calendar({ date, setDate }: CalendarProps) {
  const { pushModal } = useModalStore()
  const { activeIndex, weekDays, weekCalendarList, currentDate, setCurrentDate } = useCalendar(date)
  const calendarRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)

  const { data: walkDates = [] } = useWalkDates()

  const hasWalkRecord = (walkDates: string[], date: number) => {
    return walkDates.some(walkDate => {
      const [y, m, d] = walkDate.split('-').map(Number)
      if (y != currentDate.getFullYear()) return false
      if (m != currentDate.getMonth() + 1) return false
      if (d != date) return false
      return true
    })
  }

  useEffect(() => {
    setDate(currentDate)
  }, [currentDate])

  const handleDateClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.tagName === 'BUTTON' && target.dataset.date) {
      const day = parseInt(target.dataset.date)
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const startY = 'clientY' in e ? e.clientY : e.touches[0].clientY
    const startHeight = calendarRef.current ? calendarRef.current.offsetHeight : 0

    const doDrag = (e: MouseEvent | TouchEvent) => {
      const calendar = calendarRef.current
      if (!calendar) {
        return
      }

      const currentY = 'clientY' in e ? e.clientY : e.touches[0].clientY
      const heightDelta = currentY - startY
      const newHeight = startHeight + heightDelta
      const finalHeight = calculateFinalHeight(newHeight)

      calendar.style.height = `${finalHeight}px`

      updateOpenState(finalHeight)
    }

    const calculateFinalHeight = (newHeight: number) => {
      const MAX_ADDITIONAL_HEIGHT = 210

      if (isOpen && newHeight > startHeight) {
        return startHeight
      }

      if (!isOpen && newHeight < startHeight) {
        return startHeight
      }

      return Math.min(newHeight, startHeight + MAX_ADDITIONAL_HEIGHT)
    }

    const updateOpenState = (height: number) => {
      const CLOSE_THRESHOLD = 200
      const OPEN_THRESHOLD = 100

      if (height < startHeight - CLOSE_THRESHOLD) {
        setIsOpen(false)
        return
      }

      if (height > startHeight + OPEN_THRESHOLD) {
        setIsOpen(true)
        return
      }
    }

    const stopDrag = () => {
      document.removeEventListener('mousemove', doDrag)
      document.removeEventListener('mouseup', stopDrag)
      document.removeEventListener('touchmove', doDrag)
      document.removeEventListener('touchend', stopDrag)

      if (calendarRef.current) {
        calendarRef.current.style.height = `fit-content`
      }
    }

    document.addEventListener('mousemove', doDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchmove', doDrag)
    document.addEventListener('touchend', stopDrag)
  }

  return (
    <S.Calendar ref={calendarRef} onMouseDown={handleMouseDown} onTouchStart={handleMouseDown}>
      <S.CalendarHeader>
        <div>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </div>
        <S.DatePickerOpenBtn onClick={() => pushModal(<DatePickerModal date={currentDate} setDate={setCurrentDate} />)}>
          <img src={arrowDown} alt='날짜 선택'></img>
        </S.DatePickerOpenBtn>
      </S.CalendarHeader>
      <S.CalendarBody onClick={handleDateClick}>
        {weekDays.map((dayOfWeeks, index) => (
          <S.DayOfWeek key={index}>{dayOfWeeks}</S.DayOfWeek>
        ))}
        {weekCalendarList.map((week, weekIdx) =>
          isOpen || weekIdx === activeIndex[0] ? (
            <S.Week key={weekIdx}>
              {week.map((date, dateIdx) => {
                const isDisabled = (weekIdx === 0 && date > 7) || (weekIdx === 4 && date < 22)
                const isActive = weekIdx === activeIndex[0] && dateIdx === activeIndex[1]
                return (
                  <S.Date
                    key={dateIdx}
                    data-date={date}
                    disabled={isDisabled}
                    $isActive={isActive}
                    $hasWalkRecord={hasWalkRecord(walkDates as string[], date)}
                  >
                    {date}
                  </S.Date>
                )
              })}
            </S.Week>
          ) : null
        )}
      </S.CalendarBody>
    </S.Calendar>
  )
}
