import ChatItem from '~pages/SocialPage/components/ChatItem'
import FriendItem from '~pages/SocialPage/components/FriendItem'
import { SocialTabs } from '~types/social'
import * as S from './styles'
import { useSocialData } from '~apis/chatRoom/useSocialData'
import Loader from '~components/Loader'

type FriendChatListProps = {
  selectedTab: SocialTabs
}

export default function FriendChatList({ selectedTab }: FriendChatListProps) {
  //todo fetch by userId
  const { chatList, friendList, isError, isLoading } = useSocialData()
  if (isLoading) return <Loader />
  if (isError) return <div>Error Fetching Social Data</div>

  return (
    <S.FriendChatList>
      {selectedTab === 'friendList'
        ? friendList.map(friendInfo => <FriendItem key={friendInfo.memberId} {...friendInfo} />)
        : chatList.map(chatInfo => <ChatItem key={chatInfo.chatRoomId} {...chatInfo} />)}
    </S.FriendChatList>
  )
}
