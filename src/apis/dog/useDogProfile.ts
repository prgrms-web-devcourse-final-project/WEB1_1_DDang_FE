import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createDogProfile } from '~apis/dog/createDogProfile'
import { useNavigate } from 'react-router-dom'
import { useModalStore } from '~stores/modalStore'
import { useToastStore } from '~stores/toastStore'
import { useDogProfileStore } from '~stores/dogProfileStore'
import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchDogProfile } from '~apis/dog/fetchDogProfile'
import { queryKey } from '~constants/queryKey'
import { patchDogProfile, PatchDogProfileRequest } from '~apis/dog/patchDogProfile'

export function useCreateDogProfile() {
  const navigate = useNavigate()
  const { clearModal } = useModalStore()
  const { showToast } = useToastStore()
  const { setDogProfile } = useDogProfileStore()

  return useMutation({
    mutationFn: (formData: FormData) => createDogProfile(formData),
    onSuccess: response => {
      console.log(response.data)
      setDogProfile({ ...response.data })
      alert('반려견 등록 완료')
      clearModal()
      navigate('/')
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
  const { popModal } = useModalStore()
  const { showToast } = useToastStore()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PatchDogProfileRequest) => patchDogProfile(id, data),
    onSuccess: () => {
      alert('반려견 정보가 수정되었습니다')
      queryClient.invalidateQueries({ queryKey: queryKey.dog.profile(id) })
      popModal()
    },
    onError: (error: Error) => {
      showToast(error.message)
    },
  })
}
