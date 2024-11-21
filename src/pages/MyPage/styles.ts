import { styled } from 'styled-components'
import { ActionButton } from '../../components/Button/ActionButton'

export const MyPage = styled.div`
  display: flex;
  padding: 20px;
  height: 100vh;
  flex-direction: column; //세로 방향 정렬
`
export const ButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  align-items: center;
  width: 100%;
`
export const CustomActionButton = styled(ActionButton)`
  width: 100%;
`
