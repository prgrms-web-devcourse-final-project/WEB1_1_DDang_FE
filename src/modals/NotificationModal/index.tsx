import PrevButton from '~components/Button/PrevButton'
import * as S from './styles'
import { Typo17 } from '~components/Typo'
import NotificationList from '~components/NotificationList'
import { useModalStore } from '~stores/modalStore'

export default function NotificationModal() {
  const { popModal } = useModalStore()
  return (
    <S.NotificationModal>
      <PrevButton onClick={popModal} />
      <S.Header>
        <Typo17 $weight='700'>알림</Typo17>
      </S.Header>
      <NotificationList />
    </S.NotificationModal>
  )
}
