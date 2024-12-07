export const dateToString = (date: Date): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const stringToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export const formatTime = (hours: number, minutes: number, seconds: number) => {
  const paddedLength = hours < 100 ? 2 : String(hours).length
  return [hours, minutes, seconds].map(t => String(t).padStart(paddedLength, '0')).join(':')
}
