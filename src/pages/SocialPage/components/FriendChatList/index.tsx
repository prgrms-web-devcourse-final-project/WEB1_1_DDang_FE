import ChatItem from '~pages/SocialPage/components/ChatItem'
import FriendItem from '~pages/SocialPage/components/FriendItem'
import { SocialTabs } from '~types/social'
import * as S from './styles'
import { useSocialData } from '~apis/chatRoom/useSocialData'

type FriendChatListProps = {
  selectedTab: SocialTabs
}

export default function FriendChatList({ selectedTab }: FriendChatListProps) {
  //todo fetch by userId
  const { chatList, friendList, isError, isLoading } = useSocialData()

  return (
    <S.FriendChatList>
      {selectedTab === 'friendList'
        ? friendList.map(friendInfo => <FriendItem key={friendInfo.memberId} {...friendInfo} />)
        : chatList.map(chatInfo => <ChatItem key={chatInfo.chatRoomId} {...chatInfo} />)}
    </S.FriendChatList>
  )
}
