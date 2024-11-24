import * as S from './styles'

import { useState } from 'react'
import { useModalStore } from '~stores/modalStore'
import { DatePicker } from 'ios-style-picker'
import '/node_modules/ios-style-picker/dist/style.css'

interface DatePickerModalProps {
  date: string
  setDate: (birth: string) => void
}

export default function DatePickerModal({ date, setDate }: DatePickerModalProps) {
  const { popModal } = useModalStore()
  const [isExiting, setIsExiting] = useState(false)
  const [currentSelected, setCurrentSelected] = useState('')

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

  const generateInitDate = () => {
    if (date) {
      const [year, month, day] = date.split('. ').map(Number)
      return new Date(year, month - 1, day)
    }
    return new Date()
  }

  return (
    <S.ModalOverlay onClick={close}>
      <S.DatePickerModal isExiting={isExiting} onClick={handleModalClick}>
        <S.ConfirmBtn onClick={handleConfirmBtn}>확인</S.ConfirmBtn>
        <S.Divider />
        <DatePicker
          fromDate={new Date(2000, 0, 1)}
          toDate={new Date(new Date().getFullYear(), 11, 31)}
          infinite
          initDate={generateInitDate()}
          onChange={(y, m, d) => {
            setCurrentSelected([y, m, d].join('. '))
          }}
        />
      </S.DatePickerModal>
    </S.ModalOverlay>
  )
}
