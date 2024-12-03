import ChatItem from '~pages/SocialPage/components/ChatItem'
import FriendItem from '~pages/SocialPage/components/FriendItem'
import { ChatInfo, FriendInfo, SocialTabs } from '~types/social'
import * as S from './styles'

type FriendChatListProps = {
  selectedTab: SocialTabs
  friendList: FriendInfo[]
  chatList: ChatInfo[]
}

export default function FriendChatList({ selectedTab, friendList, chatList }: FriendChatListProps) {
  //todo fetch by userId

  return (
    <S.FriendChatList>
      {selectedTab === 'friendList'
        ? friendList.map(friendInfo => <FriendItem key={friendInfo.id} {...friendInfo} />)
        : chatList.map(chatInfo => <ChatItem key={chatInfo.id} {...chatInfo} />)}
    </S.FriendChatList>
  )
}
