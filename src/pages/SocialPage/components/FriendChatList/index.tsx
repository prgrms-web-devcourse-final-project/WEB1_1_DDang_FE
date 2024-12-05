import { useSocialData } from '~apis/chatRoom/useSocialData'
import ChatItem from '~pages/SocialPage/components/ChatItem'
import FriendItem from '~pages/SocialPage/components/FriendItem'
import { SocialTabs } from '~types/social'
import * as S from './styles'

type FriendChatListProps = {
  selectedTab: SocialTabs
}

export default function FriendChatList({ selectedTab }: FriendChatListProps) {
  const { chatList, friendList } = useSocialData()

  return (
    <S.FriendChatList>
      {selectedTab === 'friendList'
        ? friendList.map(friendInfo => <FriendItem key={friendInfo.memberId} {...friendInfo} />)
        : chatList.map(chatInfo => <ChatItem key={chatInfo.chatRoomId} {...chatInfo} />)}
    </S.FriendChatList>
  )
}
