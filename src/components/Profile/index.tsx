import { useNavigate } from 'react-router-dom'
import * as S from './styles'

type ProfileProps = {
  $size: number
  $src: string
  userId?: string
}

export default function Profile({ $size, $src, userId }: ProfileProps) {
  const navigate = useNavigate()
  const onClick = () => userId && navigate(`/profile/${userId}`)
  return <S.Profile $size={$size} $src={$src} onClick={onClick} />
}
