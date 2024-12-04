import { FetchChatRoomListResponse } from '~apis/chatRoom/fetchChatRoomList'
import { FetchFriendListResponse } from '~apis/friend/fetchFriendList'
import ChatItem from '~pages/SocialPage/components/ChatItem'
import FriendItem from '~pages/SocialPage/components/FriendItem'
import { SocialTabs } from '~types/social'
import * as S from './styles'

type FriendChatListProps = {
  selectedTab: SocialTabs
  friendList: FetchFriendListResponse
  chatList: FetchChatRoomListResponse
}

export default function FriendChatList({ selectedTab, friendList, chatList }: FriendChatListProps) {
  //todo fetch by userId

  return (
    <S.FriendChatList>
      {selectedTab === 'friendList'
        ? friendList.map(friendInfo => <FriendItem key={friendInfo.memberId} {...friendInfo} />)
        : chatList.map(chatInfo => <ChatItem key={chatInfo.chatRoomId} {...chatInfo} />)}
    </S.FriendChatList>
  )
}
