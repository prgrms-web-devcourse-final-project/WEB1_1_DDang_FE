import * as S from './styles'
import { Profile } from '~components/Profile'
import { Typo14, Typo17 } from '~components/Typo'
import { Separator } from '~components/Separator'
import { FriendInfo } from '~types/social'

type FriendItemProps = FriendInfo

export default function FriendItem({ gender, name, profileImg, role }: FriendItemProps) {
  return (
    <S.FriendItem>
      <Profile $size={48} $src={profileImg} />
      <S.TypoWrapper>
        <Typo17 $weight='700'>{name}</Typo17>
        <S.DetailWrapper>
          <Typo14 $color='font_2' $weight='500'>
            {gender === 'male' ? '남자' : '여자'}
          </Typo14>
          <Separator $height={8} />
          <Typo14 $color='font_2' $weight='500'>
            {role}
          </Typo14>
        </S.DetailWrapper>
      </S.TypoWrapper>
      <S.MessageBtn>
        <Typo14 $weight='700' $color='font_1'>
          메시지
        </Typo14>
      </S.MessageBtn>
    </S.FriendItem>
  )
}
