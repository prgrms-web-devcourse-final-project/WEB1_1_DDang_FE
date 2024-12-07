import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { fetchChatMessageList } from '~apis/chat/fetchChatMessageList'
import { queryKey } from '~constants/queryKey'

type useChatMessageListProps = {
  chatRoomId: number
}

export default function useChatMessageList({ chatRoomId }: useChatMessageListProps) {
  return useSuspenseInfiniteQuery({
    queryKey: queryKey.social.chatMessageList(chatRoomId),
    queryFn: async ({ pageParam }) => {
      return await fetchChatMessageList({ lastMessageCreatedAt: pageParam as string, chatRoomId })
    },
    getNextPageParam: lastPage => {
      return lastPage.data.last ? undefined : lastPage.data.content[0].createdAt
    },
    initialPageParam: '',
  })
}
