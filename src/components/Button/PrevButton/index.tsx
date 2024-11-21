import { IconBaseProps } from 'react-icons'
import * as S from './styles'

type PrevButtonProps = IconBaseProps

export default function PrevButton({ ...rest }: PrevButtonProps) {
  return <S.PrevButton {...rest}>PrevButton</S.PrevButton>
}
