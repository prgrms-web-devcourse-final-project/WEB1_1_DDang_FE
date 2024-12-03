import { styled } from 'styled-components'

export const SettingModalContainer = styled.div`
  padding-top: 2.5rem;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
  z-index: 1;
  display: flex;
  flex-direction: column;
`

export const TitleWrap = styled.h1`
  width: 100%;
  text-align: center;
`

//토글 영역
export const AllButtonWrapper = styled.div`
  padding-bottom: 1.25rem;
`
export const ToggleArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`
export const Content = styled.div`
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
`
export const GangbunttaArea = styled.div`
  padding: 1.25rem 0;
`
//탈퇴하기 버튼
export const ButtonArea = styled.div`
  width: 100%;
  padding: 1rem;
`
export const QuitButton = styled.div`
  padding: 0.5rem 1.75rem 0 1.75rem;
  width: 100%;
  text-align: center;
`
