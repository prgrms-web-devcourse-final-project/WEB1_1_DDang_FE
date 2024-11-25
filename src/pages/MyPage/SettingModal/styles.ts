import { styled } from 'styled-components'
import { ActionButton } from '~components/Button/ActionButton'

//헤더
export const SettingModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
  z-index: 1000;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  height: 56px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  position: relative;
  background-color: white;
`

export const BackButton = styled.button`
  position: absolute;
  left: -3px;
  background: none;
  border: none;
  margin-top: -55px;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const TitleWrap = styled.h1`
  width: 100%;
  text-align: center;
  margin: 0;
`
//토글 영역
export const AllButtonWrapper = styled.div`
  padding-bottom: 16px;
`
export const ToggleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`
export const Content = styled.div`
  flex: 1;
  padding: 20px;

  overflow-y: auto;
`
//탈퇴하기 버튼
export const CustomQuitButton = styled(ActionButton)`
  font-size: ${({ theme }) => theme.typography._17};
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
`
export const QuitButtonArea = styled.div`
  width: 100%;
  padding: 20px;
`
