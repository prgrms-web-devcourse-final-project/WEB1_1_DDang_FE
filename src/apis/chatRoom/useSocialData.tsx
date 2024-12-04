import { useQueries } from '@tanstack/react-query'
import { fetchChatRoomList } from '~apis/chatRoom/fetchChatRoomList'
import { fetchFriendList } from '~apis/friend/fetchFriendList'

export function useSocialData() {
  const results = useQueries({
    queries: [
      {
        queryKey: ['chatRoomList'],
        queryFn: () => fetchChatRoomList().then(response => response.data),
      },
      {
        queryKey: ['friendList'],
        queryFn: () => fetchFriendList().then(response => response.data),
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
