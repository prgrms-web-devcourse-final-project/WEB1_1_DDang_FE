import ChatItem from '~pages/SocialPage/components/ChatItem'
import FriendItem from '~pages/SocialPage/components/FriendItem'
import { ChatInfo, FriendInfo, SocialTabs } from '~types/social'
import * as S from './styles'
import { useEffect } from 'react'
import { fetchChatRoomList } from '~apis/chatRoom/fetchChatRoomList'

type FriendChatListProps = {
  selectedTab: SocialTabs
  friendList: FriendInfo[]
  chatList: ChatInfo[]
}

export default function FriendChatList({ selectedTab, friendList, chatList }: FriendChatListProps) {
  //todo fetch by userId
  useEffect(() => {
    fetchChatRoomList().then(data => console.log(data))
  }, [])
  return (
    <S.FriendChatList>
      {selectedTab === 'friendList'
        ? friendList.map(friendInfo => <FriendItem key={friendInfo.id} {...friendInfo} />)
        : chatList.map(chatInfo => <ChatItem key={chatInfo.chatRoomId} {...chatInfo} />)}
    </S.FriendChatList>
  )
}
