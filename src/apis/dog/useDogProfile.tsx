import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDogProfile } from '~apis/dog/createDogProfile'
import { useNavigate } from 'react-router-dom'
import { useModalStore } from '~stores/modalStore'
import { useToastStore } from '~stores/toastStore'
import { useDogProfileStore } from '~stores/dogProfileStore'
import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchDogProfile } from '~apis/dog/fetchDogProfile'
import { queryKey } from '~constants/queryKey'
import { patchDogProfile, PatchDogProfileRequest } from '~apis/dog/patchDogProfile'
import ConfirmModal from '~modals/ConfirmModal'

const { pushModal, popModal, clearModal } = useModalStore()
const { showToast } = useToastStore()
const navigate = useNavigate()

export function useCreateDogProfile() {
  const { setDogProfile } = useDogProfileStore()

  const completeRegistration = () => {
    navigate('/')
    clearModal()
  }

  return useMutation({
    mutationFn: (formData: FormData) => createDogProfile(formData),
    onSuccess: response => {
      setDogProfile({ ...response.data })
      pushModal(<ConfirmModal content='반려견 등록이 완료되었습니다' onClick={completeRegistration} />)
    },
    onError: (error: Error) => {
      showToast(error.message)
    },
  })
}

export function useFetchDogProfile(id: number) {
  return useSuspenseQuery({
    queryKey: queryKey.dog.profile(id),
    queryFn: () => fetchDogProfile({ id }).then(res => res.data),
  })
}

export function usePatchDogProfile(id: number) {
  const queryClient = useQueryClient()

  const completeRegistration = () => {
    queryClient.invalidateQueries({ queryKey: queryKey.dog.profile(id) })
    popModal()
  }

  return useMutation({
    mutationFn: (data: PatchDogProfileRequest) => patchDogProfile(id, data),
    onSuccess: () => {
      pushModal(<ConfirmModal content='반려견 등록이 수정되었습니다' onClick={completeRegistration} />)
    },
    onError: (error: Error) => {
      showToast(error.message)
    },
  })
}
