import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo14, Typo17 } from '~components/Typo'
import ChatModal from '~modals/ChatModal'
import { useModalStore } from '~stores/modalStore'
import { FriendInfo } from '~types/social'
import * as S from './styles'

type FriendItemProps = FriendInfo

export default function FriendItem({ gender, name, profileImg, role, userId }: FriendItemProps) {
  const { pushModal } = useModalStore()
  return (
    <S.FriendItem>
      <Profile $size={48} $src={profileImg} userId={userId} />
      <S.TypoWrapper>
        <Typo17 $weight='700'>{name}</Typo17>
        <S.DetailWrapper>
          <Typo14 $color='font_2' $weight='500'>
            {gender === 'MALE' ? '남자' : '여자'}
          </Typo14>
          <Separator $height={8} />
          <Typo14 $color='font_2' $weight='500'>
            {role}
          </Typo14>
        </S.DetailWrapper>
      </S.TypoWrapper>
      <S.MessageBtn onClick={() => pushModal(<ChatModal userId={userId} />)}>
        <Typo14 $weight='700' $color='font_1'>
          메시지
        </Typo14>
      </S.MessageBtn>
    </S.FriendItem>
  )
}
