import * as S from './styles'
import { Separator } from '~components/Separator'
import { Typo11, Typo13, Typo17 } from '~components/Typo'
import Profile from '~components/Profile'
import { useModalStore } from '~stores/modalStore'
import ChatModal from '~modals/ChatModal'
import { FetchChatRoomListResponse } from '~apis/chatRoom/fetchChatRoomList'

type ChatItemProps = FetchChatRoomListResponse[number]

export default function ChatItem({ chatRoomId, lastMessage, members, name, unreadMessageCount }: ChatItemProps) {
  const { pushModal } = useModalStore()

  return (
    <S.ChatItem onClick={() => pushModal(<ChatModal chatRoomId={chatRoomId} userId={members[0].memberId} />)}>
      <Profile $src={members[0].profileImg} $size={48} userId={members[0].memberId} />
      <S.TypoWrapper>
        <S.UserInfoWrapper>
          <Typo17 $weight='700'>{name}</Typo17>
          <S.DetailWrapper>
            <Typo13 $color='font_2' $weight='500'>
              {members[0].familyRole}
            </Typo13>
            <Separator $height={8} />
            <Typo13 $color='font_2' $weight='500'>
              {members[0].gender === 'MALE' ? '남' : '여'}
            </Typo13>
          </S.DetailWrapper>
        </S.UserInfoWrapper>
        {lastMessage}
      </S.TypoWrapper>
      <S.UnreadChatCount>
        <Typo11>{unreadMessageCount}</Typo11>
      </S.UnreadChatCount>
    </S.ChatItem>
  )
}
