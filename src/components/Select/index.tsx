import { useState } from 'react'
import * as S from './styles'

interface Option {
  value: string
  label: string
}

interface SelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const Select = ({ options, value, onChange, placeholder }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find(option => option.value === value)

  return (
    <S.SelectContainer>
      <S.SelectButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption ? selectedOption.label : placeholder || '선택하세요'}
        <S.Arrow isOpen={isOpen} />
      </S.SelectButton>

      {isOpen && (
        <S.OptionList>
          {options.map(option => (
            <S.Option
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              isSelected={value === option.value}
            >
              {option.label}
            </S.Option>
          ))}
        </S.OptionList>
      )}
    </S.SelectContainer>
  )
}

export default Select
