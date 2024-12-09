import useChatList from '~apis/chatRoom/useChatList'
import useFriendList from '~apis/chatRoom/useFriendList'
import ChatItem from '~pages/SocialPage/components/ChatItem'
import FriendItem from '~pages/SocialPage/components/FriendItem'
import { SocialTabs } from '~types/social'
import * as S from './styles'

type FriendChatListProps = {
  selectedTab: SocialTabs
}

function FriendList() {
  const { data: friendList } = useFriendList()

  return (
    <S.FriendChatList>
      {friendList?.map(friendInfo => <FriendItem key={friendInfo.memberId} {...friendInfo} />)}
    </S.FriendChatList>
  )
}

function ChatList() {
  const { data: chatList } = useChatList()

  return (
    <S.FriendChatList>
      {chatList?.map(chatInfo => <ChatItem key={chatInfo.chatRoomId} {...chatInfo} />)}
    </S.FriendChatList>
  )
}

export default function FriendChatList({ selectedTab }: FriendChatListProps) {
  return selectedTab === 'friendList' ? <FriendList /> : <ChatList />
}
