import * as S from './styles'
import Male from '~assets/male.svg'
import Female from '~assets/female.svg'
import { Typo17 } from '~components/Typo/index'

interface GenderSelectButtonProps {
  gender: 'MALE' | 'FEMALE'
  isActive: boolean
  onClick: () => void
}

export default function GenderSelectButton({ gender, isActive, onClick }: GenderSelectButtonProps) {
  return (
    <S.GenderBtn $isActive={isActive} onClick={onClick}>
      <S.GenderIcon $isActive={isActive} src={gender === 'MALE' ? Male : Female} alt='성별' />
      <Typo17 $weight={isActive ? '700' : '400'}>{gender === 'MALE' ? '남' : '여'}</Typo17>
    </S.GenderBtn>
  )
}
