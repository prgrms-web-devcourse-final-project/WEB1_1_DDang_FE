import { useMutation } from '@tanstack/react-query'
import { createDogProfile } from '~apis/dog/createDogProfile'
import { useNavigate } from 'react-router-dom'
import { useModalStore } from '~stores/modalStore'
import { useToastStore } from '~stores/toastStore'

export function useCreateDogProfile() {
  const navigate = useNavigate()
  const { clearModal } = useModalStore()
  const { showToast } = useToastStore()

  return useMutation({
    mutationFn: (formData: FormData) => createDogProfile(formData),
    onSuccess: () => {
      alert('반려견 등록 완료')
      clearModal()
      navigate('/')
    },
    onError: (error: Error) => {
      showToast(error.message)
    },
  })
}
