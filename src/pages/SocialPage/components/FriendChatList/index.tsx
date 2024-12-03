import ChatItem from '~pages/SocialPage/components/ChatItem'
import FriendItem from '~pages/SocialPage/components/FriendItem'
import { FriendInfo, SocialTabs } from '~types/social'
import * as S from './styles'
import { FetchChatRoomListResponse } from '~apis/chatRoom/fetchChatRoomList'

type FriendChatListProps = {
  selectedTab: SocialTabs
  friendList: FriendInfo[]
  chatList: FetchChatRoomListResponse
}

export default function FriendChatList({ selectedTab, friendList, chatList }: FriendChatListProps) {
  //todo fetch by userId

  return (
    <S.FriendChatList>
      {selectedTab === 'friendList'
        ? friendList.map(friendInfo => <FriendItem key={friendInfo.id} {...friendInfo} />)
        : chatList.map(chatInfo => <ChatItem key={chatInfo.chatRoomId} {...chatInfo} />)}
    </S.FriendChatList>
  )
}
