import { Typo14 } from '~components/Typo'
import { CommonAPIResponse } from '~types/api'
import * as S from './styles'

type SendMessageFormProps = React.FormHTMLAttributes<HTMLFormElement> & Partial<Pick<CommonAPIResponse, 'chatRoomId'>>

export default function SendMessageForm({ chatRoomId, ...rest }: SendMessageFormProps) {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (rest.onSubmit) {
      rest.onSubmit(e)
      return
    }

    //* 채팅 전송 웹소켓
    console.log('chatRoomId:', chatRoomId)
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
