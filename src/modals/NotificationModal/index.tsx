import Header from '~components/Header'
import NotificationList from '~components/NotificationList'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '~components/ErrorFallback'
import PageLoader from '~components/PageLoader'

export default function NotificationModal() {
  const { popModal } = useModalStore()
  return (
    <S.NotificationModal>
      <Header prevBtn onClickPrev={popModal} type='sm' title='알림' />
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
            <Suspense fallback={<PageLoader />}>
              <NotificationList />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </S.NotificationModal>
  )
}
