import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo14, Typo17 } from '~components/Typo'
import ChatModal from '~modals/ChatModal'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'
import { FetchFriendListResponse } from '~apis/friend/fetchFriendList'
import { createChatRoom } from '~apis/chatRoom/createChatRoom'
import { useEffect, useState } from 'react'
import { FAMILY_ROLE } from '~constants/familyRole'

type FriendItemProps = FetchFriendListResponse[number]

export default function FriendItem({ gender, name, profileImg, memberId, familyRole }: FriendItemProps) {
  const { pushModal } = useModalStore()
  const [chatRoomId, setChatRoomId] = useState(-1)

  useEffect(() => {
    createChatRoom({ opponentMemberId: memberId }).then(data => setChatRoomId(data.data.chatRoomId))
  }, [memberId])

  return (
    <S.FriendItem>
      <Profile $size={48} $src={profileImg} userId={memberId} />
      <S.TypoWrapper>
        <Typo17 $weight='700'>{name}</Typo17>
        <S.DetailWrapper>
          <Typo14 $color='font_2' $weight='500'>
            {gender === 'MALE' ? '남자' : '여자'}
          </Typo14>
          <Separator $height={8} />
          <Typo14 $color='font_2' $weight='500'>
            {FAMILY_ROLE[familyRole]}
          </Typo14>
        </S.DetailWrapper>
      </S.TypoWrapper>
      <S.MessageBtn onClick={() => pushModal(<ChatModal chatRoomId={chatRoomId} userId={memberId} />)}>
        <Typo14 $weight='700' $color='font_1'>
          메시지
        </Typo14>
      </S.MessageBtn>
    </S.FriendItem>
  )
}
