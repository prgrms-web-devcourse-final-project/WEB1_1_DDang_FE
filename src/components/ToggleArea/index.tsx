import ToggleBox from '@components/ToggleBox'
import * as S from './styles'

export default function ToggleArea() {
  return (
    <S.ToggleArea>
      <ToggleBox setting={'friendRequests'} />
      <ToggleBox setting={'familyWalkNotifications'} />
      <ToggleBox setting={'myWalkNotifications'} />
      <ToggleBox setting={'messages'} />
    </S.ToggleArea>
  )
}
