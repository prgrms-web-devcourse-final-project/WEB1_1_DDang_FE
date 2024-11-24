import * as S from './styles'

interface AlertFormProp {
  content: string
}

export default function AlertForm({ content }: AlertFormProp) {
  return <S.Alert>{content}</S.Alert>
}
