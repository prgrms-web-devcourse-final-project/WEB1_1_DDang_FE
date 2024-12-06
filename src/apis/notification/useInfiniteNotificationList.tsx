import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { FetchNotificationListResponse, fetchNotificationList } from '~apis/notification/fetchNotificationList'
import { queryKey } from '~constants/queryKey'
import { APIResponse } from '~types/api'

export default function useInfiniteNotificationList() {
  return useSuspenseInfiniteQuery<APIResponse<FetchNotificationListResponse>>({
    queryKey: queryKey.notification(),
    queryFn: async ({ pageParam = 0 }) => {
      if (pageParam !== 0) await new Promise(resolve => setTimeout(resolve, 1000))
      return await fetchNotificationList({ page: pageParam as number })
    },
    getNextPageParam: lastPage => {
      return lastPage.data.last ? undefined : lastPage.data.number + 1
    },
    initialPageParam: 0,
  })
}
