import useInfiniteNotificationList from '~apis/notification/useInfiniteNotificationList'
import { InfiniteScrollTrigger } from '~components/InfiniteScrollTrigger'
import NotificationItem from '~components/NotificationItem'
import { Spinner } from '~components/Spinner'
import useObserver from '~hooks/useObserver'
import * as S from './styles'

export default function NotificationList() {
  const { observerRef } = useObserver<HTMLDivElement>({
    callback: () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteNotificationList()

  return (
    <S.NotificationList>
      {data?.pages.map(page =>
        page.data?.content.map(notification => (
          <NotificationItem
            key={notification.notificationId}
            content={notification.content}
            date={new Date(notification.createdAt)}
          />
        ))
      )}
      <InfiniteScrollTrigger ref={observerRef}>
        {isFetchingNextPage && <Spinner $size={20} $stroke={3} />}
      </InfiniteScrollTrigger>
    </S.NotificationList>
  )
}
