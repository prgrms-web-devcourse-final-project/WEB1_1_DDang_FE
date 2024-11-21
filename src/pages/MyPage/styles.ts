import { styled } from 'styled-components'
import { ActionButton } from '../../components/Button/ActionButton'

export const MyPage = styled.div``

export const MainContainer = styled.div`
  display: flex;
  padding: 20px;
  height: 90vh;
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
export const HeaderContainer = styled.div`
  width: 100%;
  height: 56px;
  flex-shrink: 0;
  border: 1px solid red;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._17};
  text-align: center;
  font-weight: 700;
  line-height: 150%;
  padding: 15px 150px 15px 150px;
  justify-content: center;
  position: relative;
`
export const SettingIcon = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-top: -26px; //근데 이게 맞나..
`
