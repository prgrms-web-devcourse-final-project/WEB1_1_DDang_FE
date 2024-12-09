import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchInviteCode } from './fetchInviteCode'
import { queryKey } from '~constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchFamilyDogs } from './fetchfamilyDogs'
import { joinFamily } from './joinFamily'
import { useToastStore } from '~stores/toastStore'
import { useNavigate } from 'react-router-dom'
import { useModalStore } from '~stores/modalStore'
import ConfirmModal from '~modals/ConfirmModal'

export function useInviteCode() {
  return useSuspenseQuery({
    queryKey: queryKey.family.inviteCode(),
    queryFn: () => fetchInviteCode().then(res => res.data),
  })
}

export function useFetchFamilyDogs() {
  const { showToast } = useToastStore()
  return useMutation({
    mutationFn: (inviteCode: string) => fetchFamilyDogs({ inviteCode }).then(res => res.data),
    onError: (error: Error) => {
      showToast(error.message)
    },
  })
}

export function useJoinFamily() {
  const queryClient = useQueryClient()
  const { showToast } = useToastStore()
  const { pushModal, clearModal } = useModalStore()
  const navigate = useNavigate()

  const completeRegistration = () => {
    queryClient.invalidateQueries({ queryKey: queryKey.family.profile() })
    navigate('/')
    clearModal()
  }

  return useMutation({
    mutationFn: (inviteCode: string) => joinFamily({ inviteCode }).then(res => res.data),
    onSuccess: () => {
      pushModal(<ConfirmModal content='가족 참여가 완료되었습니다' onClick={completeRegistration} />)
    },
    onError: (error: Error) => {
      showToast(error.message)
    },
  })
}
