import { styled } from 'styled-components'
import { ActionButton } from '../../components/Button/ActionButton'

export const MyPage = styled.div`
  width: 375px;
  height: 698px;
  border: 1px solid blue;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
`

export const MainContainer = styled.div`
  display: flex;
  padding: 20px;
  height: calc(100% - 56px);
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
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
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
`

export const SettingIcon = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
`

export const ProfileSection = styled.div`
  width: 100%;
  height: 285px;
  flex-shrink: 0;
  background-color: white;
  border-radius: 16px;
  box-sizing: border-box;
`

export const CountSectioin = styled(ProfileSection)`
  width: 100%;
  height: 96px;
  flex-shrink: 0;
  margin-top: 12px;
`
//프로필정보
export const ProfileArea = styled.div`
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  margin: 24px auto;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-10px);
  gap: 3.5px;
`

export const TypoWrap = styled.div`
  display: flex;
  gap: 10px;
`
//횟수 정보
export const CountArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const CountWrapperBig = styled.div`
  font-size: ${({ theme }) => theme.typography._20};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
`

export const CountWrapperSmall = styled.div`
  font-size: ${({ theme }) => theme.typography._13};
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-weight: 500;
`
