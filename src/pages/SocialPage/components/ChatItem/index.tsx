import { ChatInfo } from '~types/social'
import * as S from './styles'
import { Separator } from '~components/Separator'
import { Typo11, Typo13, Typo17 } from '~components/Typo'
import Profile from '~components/Profile'
import { useModalStore } from '~stores/modalStore'
import ChatModal from '~modals/ChatModal'

type ChatItemProps = ChatInfo

export default function ChatItem({
  gender,
  lastMessage,
  name,
  profileImg,
  role,
  unreadMessageCount,
  members,
  chatRoomId,
}: ChatItemProps) {
  const { pushModal } = useModalStore()

  return (
    <S.ChatItem onClick={() => pushModal(<ChatModal chatRoomId={chatRoomId} userId={members[0].memberId} />)}>
      <Profile $src={profileImg} $size={48} userId={members[0].memberId} />
      <S.TypoWrapper>
        <S.UserInfoWrapper>
          <Typo17 $weight='700'>{name}</Typo17>
          <S.DetailWrapper>
            <Typo13 $color='font_2' $weight='500'>
              {role}
            </Typo13>
            <Separator $height={8} />
            <Typo13 $color='font_2' $weight='500'>
              {gender === 'male' ? '남' : '여'}
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
