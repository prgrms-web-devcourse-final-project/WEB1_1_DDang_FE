declare module 'ios-style-picker' {
  export interface FormatterFunctions {
    year?: (value: number) => string
    month?: (value: number) => string
    day?: (value: number) => string
  }

  export interface DatePickerProps {
    onChange: (year: number, month: number, day: number) => void
    fromDate?: Date
    toDate?: Date
    initDate?: Date
    infinite?: boolean
    className?: string
    formatters?: FormatterFunctions
  }

  export const DatePicker: React.FC<DatePickerProps>
}
