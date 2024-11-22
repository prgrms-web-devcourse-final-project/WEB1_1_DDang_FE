import { Typo14 } from '~components/Typo'
import * as S from './styles'

type SendMessageFormProps = React.FormHTMLAttributes<HTMLFormElement>

export default function SendMessageForm({ ...rest }: SendMessageFormProps) {
  return (
    <S.SendMessageForm {...rest}>
      <S.ChatInput placeholder='채팅 내용 입력' />
      <S.SendBtn>
        <Typo14 weight='700'>전송</Typo14>
      </S.SendBtn>
    </S.SendMessageForm>
  )
}
