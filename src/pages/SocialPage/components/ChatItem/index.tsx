import { ChatInfo } from '~types/social'
import * as S from './styles'
import { Separator } from '~components/Separator'
import { Typo11, Typo13, Typo17 } from '~components/Typo'
import Profile from '~components/Profile'
import { useModalStore } from '~stores/modalStore'
import ChatModal from '~modals/ChatModal'

type ChatItemProps = ChatInfo

export default function ChatItem({ gender, lastChat, name, profileImg, role, unreadChatCount, userId }: ChatItemProps) {
  const { pushModal } = useModalStore()

  return (
    <S.ChatItem onClick={() => pushModal(<ChatModal userId={userId} />)}>
      <Profile $src={profileImg} $size={48} userId={userId} />
      <S.TypoWrapper>
        <S.UserInfoWrapper>
          <Typo17 $weight='700'>{name}</Typo17>
          <S.DetailWrapper>
            <Typo13 $color='font_2' $weight='500'>
              {role}
            </Typo13>
            <Separator $height={8} />
            <Typo13 $color='font_2' $weight='500'>
              {gender === 'MALE' ? '남' : '여'}
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
