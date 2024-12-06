import useInfiniteNotificationList from '~apis/notification/useInfiniteNotificationList'
import Loader from '~components/Loader'
import NotificationItem from '~components/NotificationItem'
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
      <div ref={observerRef} style={{ height: '20px' }}>
        {isFetchingNextPage && <Loader />}
      </div>
    </S.NotificationList>
  )
}
