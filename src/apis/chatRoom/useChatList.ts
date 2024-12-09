import { useQuery } from '@tanstack/react-query'
import { fetchChatRoomList } from '~apis/chatRoom/fetchChatRoomList'
import { queryKey } from '~constants/queryKey'

export default function useChatList() {
  return useQuery({
    queryKey: queryKey.social.chatRoomList(),
    queryFn: () => fetchChatRoomList().then(res => res.data),
  })
}
