import { FetchChatRoomListResponse } from '~apis/chatRoom/fetchChatRoomList'
import { useCreateChatRoom } from '~apis/chatRoom/useCreateChatRoom'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo11, Typo13, Typo17 } from '~components/Typo'
import * as S from './styles'
import { FAMILY_ROLE } from '~constants/familyRole'

type ChatItemProps = FetchChatRoomListResponse[number]

export default function ChatItem({ lastMessage, members, name, unreadMessageCount }: ChatItemProps) {
  const { createRoom } = useCreateChatRoom()

  const onClickChatItem = () => createRoom({ opponentMemberId: members[0].memberId })

  return (
    <S.ChatItem onClick={onClickChatItem}>
      <Profile $src={members[0].profileImg} $size={48} userId={members[0].memberId} />
      <S.TypoWrapper>
        <S.UserInfoWrapper>
          <Typo17 $weight='700'>{name}</Typo17>
          <S.DetailWrapper>
            <Typo13 $color='font_2' $weight='500'>
              {FAMILY_ROLE[members[0].familyRole]}
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
