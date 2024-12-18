import { useCreateChatRoom } from '~apis/chatRoom/useCreateChatRoom'
import { FetchFriendListResponse } from '~apis/friend/fetchFriendList'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo14, Typo17 } from '~components/Typo'
import { FAMILY_ROLE } from '~constants/familyRole'
import * as S from './styles'

type FriendItemProps = FetchFriendListResponse[number]

export default function FriendItem({ gender, name, profileImg, memberId, familyRole }: FriendItemProps) {
  const { createRoom } = useCreateChatRoom()

  const onClickMessageBtn = () => createRoom({ opponentMemberId: memberId })

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
            {FAMILY_ROLE[familyRole as keyof typeof FAMILY_ROLE]}
          </Typo14>
        </S.DetailWrapper>
      </S.TypoWrapper>
      <S.MessageBtn onClick={onClickMessageBtn}>
        <Typo14 $weight='700' $color='font_1'>
          메시지
        </Typo14>
      </S.MessageBtn>
    </S.FriendItem>
  )
}
