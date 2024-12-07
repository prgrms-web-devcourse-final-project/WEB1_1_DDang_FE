import { useMutation, UseMutationResult } from '@tanstack/react-query'
import ChatModal from '~modals/ChatModal'
import { useModalStore } from '~stores/modalStore'
import { APIResponse } from '~types/api'
import { createChatRoom, CreateChatRoomRequest, CreateChatRoomResponse } from './createChatRoom'

export const useCreateChatRoom = (): UseMutationResult<
  APIResponse<CreateChatRoomResponse>,
  Error,
  CreateChatRoomRequest
> & {
  createRoom: (req: CreateChatRoomRequest) => void
} => {
  const { pushModal } = useModalStore()

  const mutation = useMutation<APIResponse<CreateChatRoomResponse>, Error, CreateChatRoomRequest>({
    mutationFn: createChatRoom,
    onSuccess: (data, { opponentMemberId }) => {
      console.log(data.message || '채팅방 생성 성공')
      pushModal(<ChatModal chatRoomId={data.data.chatRoomId} opponentMemberId={opponentMemberId} />)
    },
    onError: error => {
      console.error('채팅방 생성 실패:', error.message)
    },
  })

  return {
    ...mutation,
    createRoom: mutation.mutate,
  }
}
