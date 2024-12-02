import * as S from './styles'
import { useState } from 'react'
import { useModalStore } from '~stores/modalStore'
import { DatePicker } from 'ios-style-picker'
import '/node_modules/ios-style-picker/dist/style.css'

interface DatePickerModalProps {
  date: Date | null
  setDate: (birth: Date) => void
}

export default function DatePickerModal({ date, setDate }: DatePickerModalProps) {
  const { popModal } = useModalStore()
  const [isExiting, setIsExiting] = useState(false)
  const [currentSelected, setCurrentSelected] = useState<Date>(date || new Date())
  const close = () => {
    setIsExiting(true)
    setTimeout(() => {
      popModal()
    }, 300)
  }

  const handleConfirmBtn = () => {
    setDate(currentSelected)
    close()
  }

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  return (
    <S.ModalOverlay onClick={close}>
      <S.DatePickerModal $isExiting={isExiting} onClick={handleModalClick}>
        <S.ConfirmBtn onClick={handleConfirmBtn}>확인</S.ConfirmBtn>
        <S.Divider />
        <DatePicker
          fromDate={new Date(2000, 0, 1)}
          toDate={new Date(new Date().getFullYear(), 11, 31)}
          infinite
          initDate={date || new Date()}
          onChange={(y, m, d) => {
            setCurrentSelected(new Date(y, m - 1, d))
          }}
        />
      </S.DatePickerModal>
    </S.ModalOverlay>
  )
}
