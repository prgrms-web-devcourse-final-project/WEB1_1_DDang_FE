import React from 'react'

const CALENDAR_LENGTH = 35
const DAYS_IN_WEEK = 7
const MAX_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
const WEEKDAYS = ['월', '화', '수', '목', '금', '토', '일']

interface UseCalendarReturn {
  activeIndex: number[]
  weekDays: string[]
  weekCalendarList: number[][]
  currentDate: Date
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
}

const getDaysInMonth = (date: Date) => {
  if (date.getFullYear() % 4 === 0 && date.getMonth() === 1) return 29
  return MAX_DAYS[date.getMonth()]
}

export default function useCalendar(): UseCalendarReturn {
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date())
  const daysInCurrentMonth = getDaysInMonth(currentDate)
  const daysInPreviousMonth = getDaysInMonth(
    new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate())
  )
  const firstDayInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)

  const previousMonthDays = Array.from({
    length: firstDayInCurrentMonth.getDay() - 1,
  }).map((_, idx, prevList) => daysInPreviousMonth - prevList.length + 1 + idx)

  const currentMonthDays = Array.from({ length: daysInCurrentMonth }).map((_, idx) => idx + 1)

  const nextMonthDays = Array.from({
    length: CALENDAR_LENGTH - currentMonthDays.length - previousMonthDays.length,
  }).map((_, idx) => idx + 1)

  const fullCalendarDays = previousMonthDays.concat(currentMonthDays, nextMonthDays)

  const weekCalendarList = fullCalendarDays.reduce((weeks: number[][], day, idx) => {
    const weekIndex = Math.floor(idx / DAYS_IN_WEEK)
    if (!weeks[weekIndex]) {
      weeks[weekIndex] = []
    }
    weeks[weekIndex].push(day)
    return weeks
  }, [])

  const currentPosition = previousMonthDays.length + currentDate.getDate() - 1
  const activeIndex = [Math.floor(currentPosition / DAYS_IN_WEEK), currentPosition % DAYS_IN_WEEK]

  return {
    activeIndex: activeIndex,
    weekDays: WEEKDAYS,
    weekCalendarList: weekCalendarList,
    currentDate: currentDate,
    setCurrentDate: setCurrentDate,
  }
}
