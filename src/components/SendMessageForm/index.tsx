import { Typo14 } from '~components/Typo'
import { CommonAPIResponse } from '~types/api'
import * as S from './styles'
import { useWebSocket } from '~/WebSocketContext'

type SendMessageFormProps = React.FormHTMLAttributes<HTMLFormElement> & Partial<Pick<CommonAPIResponse, 'chatRoomId'>>

export default function SendMessageForm({ chatRoomId, ...rest }: SendMessageFormProps) {
  const { publish } = useWebSocket()
  const sendMessage = (message: string) => {
    console.log(`채팅방 번호 ${chatRoomId}로 채팅을 보냅니다.`)
    publish(`/pub/api/v1/chat/message`, { chatRoomId, message })
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (rest.onSubmit) {
      rest.onSubmit(e)
      return
    }
    const $form = e.target as HTMLFormElement
    const formData = new FormData($form)
    const message = formData.get('message') as string
    if (!message.trim()) return
    sendMessage(message)
    $form.reset()
  }

  return (
    <S.SendMessageForm onSubmit={onSubmit} {...rest}>
      <S.ChatInput placeholder='채팅 내용 입력' name='message' />
      <S.SendBtn>
        <Typo14 $weight='700'>전송</Typo14>
      </S.SendBtn>
    </S.SendMessageForm>
  )
}
