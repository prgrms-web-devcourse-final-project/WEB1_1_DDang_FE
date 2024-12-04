import { Typo14 } from '~components/Typo'
import * as S from './styles'
import { createChatRoom } from '~apis/chatRoom/createChatRoom'
import { CommonAPIResponse } from '~types/api'

type SendMessageFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  chatCount: number
} & Pick<CommonAPIResponse, 'chatRoomId'>

export default function SendMessageForm({ chatCount, ...rest }: SendMessageFormProps) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (rest.onSubmit) rest.onSubmit(e)
    else {
      if (chatCount === 0) {
        //* 채팅방 생성
        await createChatRoom({ opponentMemberId: 123 })
      }
      //* 채팅 전송 웹소켓
    }
  }
  return (
    <S.SendMessageForm onSubmit={onSubmit} {...rest}>
      <S.ChatInput placeholder='채팅 내용 입력' />
      <S.SendBtn>
        <Typo14 $weight='700'>전송</Typo14>
      </S.SendBtn>
    </S.SendMessageForm>
  )
}
