import * as S from './styles'
import { useState } from 'react'
import useCalendar from '~hooks/useCalendar'
import arrowDown from '~assets/arrow-down.svg'

export default function Calendar() {
  const { weekDays, weekCalendarList, currentDate, setCurrentDate } = useCalendar()
  const [select, setSelect] = useState<number[]>([])
  console.log(currentDate)

  const handleClickDay = (day: number) => {
    const findItem = select.find(item => item === day)
    if (findItem) setSelect(state => state.filter(item => item !== day))
    else setSelect(state => [...state, day])
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
  }

  return (
    <S.Calendar>
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
        {weekCalendarList.map((week, weekIdx) => (
          <S.Week key={weekIdx}>
            {week.map((date, dateIdx) => {
              const isDisabled = (weekIdx === 0 && date > 7) || (weekIdx === 4 && date < 22)
              const isActive = date === currentDate.getDate() && !isDisabled

              return (
                <S.Date key={dateIdx} onClick={() => handleClickDay(date)} disabled={isDisabled} $isActive={isActive}>
                  {date}
                </S.Date>
              )
            })}
          </S.Week>
        ))}
      </S.CalendarBody>
    </S.Calendar>
  )
}
