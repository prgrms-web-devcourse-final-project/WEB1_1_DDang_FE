import { useNavigate } from 'react-router-dom'
import * as S from './styles'
import { useModalStore } from '~stores/modalStore'

type ProfileProps = {
  $size: number
  $src: string
  userId?: number
}

export default function Profile({ $size, $src, userId }: ProfileProps) {
  const { clearModal } = useModalStore()
  const navigate = useNavigate()
  const onClick = () => {
    if (!userId) return
    navigate(`/profile/${userId}`)
    clearModal()
  }
  return <S.Profile $size={$size} $src={$src} $userId={userId} onClick={onClick} />
}
