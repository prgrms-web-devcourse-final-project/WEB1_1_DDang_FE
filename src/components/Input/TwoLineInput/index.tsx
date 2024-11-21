import { TEXTAREA_VALIDATION } from '~constants/validations'
import { ChangeEvent, useState } from 'react'
import { TextareaAutosizeProps } from 'react-textarea-autosize'
import * as S from './styles'

type TwoLineInputProps = TextareaAutosizeProps

export default function TwoLineInput({ ...rest }: TwoLineInputProps) {
  const [value, setValue] = useState('')

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const currentValue = e.target.value
    const lines = currentValue.split('\n')

    if (lines.length > 2) {
      const limitedValue = lines.slice(0, 2).join('\n')
      setValue(limitedValue)
      return
    }

    setValue(currentValue)
  }

  return (
    <S.TwoLineInput maxRows={2} value={value} onChange={onChange} maxLength={TEXTAREA_VALIDATION.maxLength} {...rest} />
  )
}
