import Toggle from '@components/Toggle'
import * as S from './styles'

type ToggleBoxProps = {
  id: string
}

export default function ToggleBox({ id }: ToggleBoxProps) {
  return (
    <S.ToggleBox>
      <p>모든 알람</p>
      <Toggle id={id} />
    </S.ToggleBox>
  )
}
