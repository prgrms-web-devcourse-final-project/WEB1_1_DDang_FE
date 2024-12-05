import { useSuspenseQueries } from '@tanstack/react-query'
import { fetchChatRoomList } from '~apis/chatRoom/fetchChatRoomList'
import { fetchFriendList } from '~apis/friend/fetchFriendList'

export function useSocialData() {
  const results = useSuspenseQueries({
    queries: [
      {
        queryKey: ['chatRoomList'],
        queryFn: () => fetchChatRoomList().then(res => res.data),
      },
      {
        queryKey: ['friendList'],
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
