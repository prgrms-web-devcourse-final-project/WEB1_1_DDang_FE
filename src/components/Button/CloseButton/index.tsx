import { IconBaseProps } from 'react-icons'
import * as S from './styles'

type CloseButtonProps = IconBaseProps
export default function CloseButton({ ...rest }: CloseButtonProps) {
  return <S.CloseButton cursor='pointer' {...rest} />
}
