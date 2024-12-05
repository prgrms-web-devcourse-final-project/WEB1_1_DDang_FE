import { useSuspenseQueries } from '@tanstack/react-query'
import { fetchChatRoomList } from '~apis/chatRoom/fetchChatRoomList'
import { fetchFriendList } from '~apis/friend/fetchFriendList'
import { queryKey } from '~constants/queryKey'

export function useSocialData() {
  const results = useSuspenseQueries({
    queries: [
      {
        queryKey: queryKey.social.chatRoomList(),
        queryFn: () => fetchChatRoomList().then(res => res.data),
      },
      {
        queryKey: queryKey.social.friendList(),
        queryFn: () => fetchFriendList().then(res => res.data),
      },
    ],
  })

  const [chatListQuery, friendListQuery] = results

  return {
    chatList: chatListQuery.data ?? [],
    friendList: friendListQuery.data ?? [],
    isLoading: chatListQuery.isLoading || friendListQuery.isLoading,
    isError: chatListQuery.isError || friendListQuery.isError,
  }
}
