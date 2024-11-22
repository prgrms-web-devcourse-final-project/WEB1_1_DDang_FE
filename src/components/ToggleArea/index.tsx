import ToggleBox from '~components/ToggleBox'
import * as S from './styles'

export default function ToggleArea() {
  return (
    <S.ToggleArea>
      <ToggleBox setting={'friendRequests'} type='lg' />
      <ToggleBox setting={'familyWalkNotifications'} type='lg' />
      <ToggleBox setting={'myWalkNotifications'} type='lg' />
      <ToggleBox setting={'messages'} type='lg' />
    </S.ToggleArea>
  )
}
