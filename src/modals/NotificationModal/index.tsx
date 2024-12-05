import Header from '~components/Header'
import NotificationList from '~components/NotificationList'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'

export default function NotificationModal() {
  const { popModal } = useModalStore()
  return (
    <S.NotificationModal>
      <Header prevBtn onClickPrev={popModal} type='sm' title='알림' />
      <NotificationList />
    </S.NotificationModal>
  )
}
