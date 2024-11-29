import React, { useState, useRef } from 'react'
import * as S from './styles'
import useCalendar from '~hooks/useCalendar'
import arrowDown from '~assets/arrow-down.svg'

let maxHeight = 400
const Calendar: React.FC = () => {
  const { activeIndex, weekDays, weekCalendarList, currentDate, setCurrentDate } = useCalendar()
  const calendarRef = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  // const minHeight = calendarRef.current?.style.height

  const handleClickDay = (day: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const startY = 'clientY' in e ? e.clientY : e.touches[0].clientY
    const startHeight = calendarRef.current ? calendarRef.current.offsetHeight : 0

    const doDrag = (e: MouseEvent | TouchEvent) => {
      if (calendarRef.current) {
        const currentY = 'clientY' in e ? e.clientY : e.touches[0].clientY
        const newHeight = startHeight + currentY - startY
        const finalHeight = Math.min(maxHeight, Math.max(100, newHeight))
        calendarRef.current.style.height = `${finalHeight}px`

        if (finalHeight < 300) setIsOpen(false)
        else if (finalHeight > 150) setIsOpen(true)
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
      // if (calendarRef.current) {
      //   const currentHeight = parseInt(calendarRef.current.style.height)
      //   if (isOpen) maxHeight = currentHeight
      //   else minHeight = currentHeight
      // }
    }

    document.addEventListener('mousemove', doDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchmove', doDrag)
    document.addEventListener('touchend', stopDrag)
  }

  return (
    <S.Calendar ref={calendarRef}>
      <S.CalendarHeader>
        <div>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </div>
        <S.DatePickerOpenBtn>
          <img src={arrowDown} alt='날짜 선택'></img>
        </S.DatePickerOpenBtn>
      </S.CalendarHeader>
      <S.CalendarBody>
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
                  <S.Date key={dateIdx} onClick={() => handleClickDay(date)} disabled={isDisabled} $isActive={isActive}>
                    {date}
                  </S.Date>
                )
              })}
            </S.Week>
          ) : null
        )}
      </S.CalendarBody>
      <S.CalenderDragHandler onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} />
    </S.Calendar>
  )
}

export default Calendar
