import { Typo13, Typo15 } from '~components/Typo'
import * as S from './styles'
type NotificationItemProps = {
  content: string
  date: Date
}

export default function NotificationItem({ content, date }: NotificationItemProps) {
  return (
    <S.NotificationItem>
      <S.Dot />
      <S.TypoArea>
        <Typo15 $weight='700'>{content}</Typo15>
        <Typo13 $color='font_3'>{date.toISOString().slice(0, 10)}</Typo13>
      </S.TypoArea>
    </S.NotificationItem>
  )
}
