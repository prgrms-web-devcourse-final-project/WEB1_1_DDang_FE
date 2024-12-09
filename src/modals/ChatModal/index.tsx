import { HiEllipsisVertical } from 'react-icons/hi2'
import Header from '~components/Header'
import Profile from '~components/Profile'
import { Separator } from '~components/Separator'
import { Typo11, Typo15 } from '~components/Typo'
import ChatArea from '~modals/ChatArea'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'
import { useFetchProfile } from '~apis/member/useFetchProfile'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'
import PageLoader from '~components/PageLoader'
import ErrorFallback from '~components/ErrorFallback'
import { FAMILY_ROLE } from '~constants/familyRole'
import { Spinner } from '~components/Spinner'

type ChatModalProps = {
  chatRoomId: number
  opponentMemberId: number
}

export default function ChatModal({ chatRoomId, opponentMemberId }: ChatModalProps) {
  return (
    <S.ChatModal>
      <QueryErrorResetBoundary>
        <S.FallbackWrapper>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<Spinner />}>
              <ChatModalHeader opponentMemberId={opponentMemberId} />
            </Suspense>
          </ErrorBoundary>
        </S.FallbackWrapper>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Suspense fallback={<PageLoader />}>
            <ChatArea chatRoomId={chatRoomId} />
          </Suspense>
        </ErrorBoundary>
      </QueryErrorResetBoundary>
    </S.ChatModal>
  )
}

type ChatModalHeaderProps = {
  opponentMemberId: number
}

function ChatModalHeader({ opponentMemberId }: ChatModalHeaderProps) {
  const {
    data: { name, gender, familyRole },
  } = useFetchProfile(opponentMemberId)
  const { popModal } = useModalStore()

  return (
    <Header type='lg' prevBtn onClickPrev={popModal}>
      <S.ProfileWrapper>
        <Profile $size={40} $src='' userId={opponentMemberId} />
        <S.TypoWrapper>
          <Typo15 $weight='700'>{name}</Typo15>
          <S.DetailWrapper>
            <Typo11 $color='font_2'>{gender === 'MALE' ? '남자' : '여자'}</Typo11>
            <Separator $height={8} />
            <Typo11 $color='font_2'>{FAMILY_ROLE[familyRole]}</Typo11>
          </S.DetailWrapper>
        </S.TypoWrapper>
      </S.ProfileWrapper>
      <S.EllipsisWrapper>
        <HiEllipsisVertical size={28} />
      </S.EllipsisWrapper>
    </Header>
  )
}
