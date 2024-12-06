import { HiEllipsisVertical } from 'react-icons/hi2'
import Header from '~components/Header'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo11, Typo15 } from '~components/Typo'
import ChatArea from '~modals/ChatArea'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'

type ChatModalProps = {
  chatRoomId: number
  userId: number
}

export default function ChatModal({ chatRoomId, userId }: ChatModalProps) {
  const { popModal } = useModalStore()
  console.log('userId', userId) //todo fetch by userId

  return (
    <S.ChatModal>
      <Header type='lg' prevBtn onClickPrev={popModal}>
        <S.ProfileWrapper>
          <Profile $size={40} $src='' userId={userId} />
          <S.TypoWrapper>
            <Typo15 $weight='700'>감자탕수육</Typo15>
            <S.DetailWrapper>
              <Typo11 $color='font_2'>남자</Typo11>
              <Separator $height={8} />
              <Typo11 $color='font_2'>할아버지</Typo11>
            </S.DetailWrapper>
          </S.TypoWrapper>
        </S.ProfileWrapper>
        <S.EllipsisWrapper>
          <HiEllipsisVertical size={28} />
        </S.EllipsisWrapper>
      </Header>
      <ChatArea chatRoomId={chatRoomId} />
    </S.ChatModal>
  )
}
