import * as S from './styles'
import { useState } from 'react'

type ToggleProps = {
  id: string
}

export default function Toggle({ id }: ToggleProps) {
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }

  return (
    <S.Toggle>
      <input name={id} id={id} type='checkbox' checked={checked} onChange={handleChange} hidden />
      <label htmlFor={id}>
        <S.Circle />
      </label>
    </S.Toggle>
  )
}
