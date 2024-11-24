import * as S from './styles'

type TagProps = {
  content: string
}

export default function Tag({ content }: TagProps) {
  return <S.Tag>#{content}</S.Tag>
}
