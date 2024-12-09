import { useQuery } from '@tanstack/react-query'
import { fetchFriendList } from '~apis/friend/fetchFriendList'
import { queryKey } from '~constants/queryKey'

export default function useFriendList() {
  return useQuery({
    queryKey: queryKey.social.friendList(),
    queryFn: () => fetchFriendList().then(res => res.data),
  })
}
