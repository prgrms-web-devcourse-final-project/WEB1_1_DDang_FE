import { ChatInfo } from '~types/social'
import * as S from './styles'
import { Separator } from '~components/Separator'
import { Typo11, Typo13, Typo17 } from '~components/Typo'
import { Profile } from '~components/Profile'

type ChatItemProps = ChatInfo

export default function ChatItem({ gender, lastChat, name, profileImg, role, unreadChatCount }: ChatItemProps) {
  return (
    <S.ChatItem>
      <Profile $src={profileImg} $size={48} />
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
        {lastChat}
      </S.TypoWrapper>
      <S.UnreadChatCount>
        <Typo11>{unreadChatCount}</Typo11>
      </S.UnreadChatCount>
    </S.ChatItem>
  )
}
