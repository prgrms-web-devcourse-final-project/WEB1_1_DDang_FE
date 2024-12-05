import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { fetchNotificationList, FetchNotificationListResponse } from '~apis/notification/fetchNotificationList'
import Loader from '~components/Loader'
import NotificationItem from '~components/NotificationItem'
import { queryKey } from '~constants/queryKey'
import useObserver from '~hooks/useObserver'
import { APIResponse } from '~types/api'
import * as S from './styles'

export default function NotificationList() {
  const { observerRef } = useObserver<HTMLDivElement>({
    callback: () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery<
    APIResponse<FetchNotificationListResponse>
  >({
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

  return (
    <S.NotificationList>
      {data?.pages.map(page =>
        page.data?.content.map(notification => (
          <NotificationItem
            key={notification.notificationId}
            content={notification.content}
            date={new Date(notification.createdAt || '2024-12-05')}
          />
        ))
      )}
      <div ref={observerRef} style={{ height: '20px' }}>
        {isFetchingNextPage && <Loader />}
      </div>
    </S.NotificationList>
  )
}
