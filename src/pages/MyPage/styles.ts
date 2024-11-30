import { styled } from 'styled-components'

export const MyPage = styled.div`
  width: 23.4375rem;
  height: 43.625rem;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
`

export const MainContainer = styled.div`
  display: flex;
  padding: 0 1.25rem;
  height: calc(100% - 3.5rem);
  flex-direction: column;
  box-sizing: border-box;
  overflow-y: auto;
`

export const HeaderContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._17};
  text-align: center;
  font-weight: 700;
  line-height: 150%;
  padding: 0.9375rem 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-sizing: border-box;
`

export const SettingIcon = styled.div`
  position: absolute;
  right: 1.25rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
`

export const ProfileSection = styled.div`
  width: 100%;
  height: 17.8125rem;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  border-radius: 1rem;
  box-sizing: border-box;
  padding: 0 1.25rem;
`

export const ProfileArea = styled.div`
  width: 8.75rem;
  height: 8.75rem;
  flex-shrink: 0;
  margin: 1.5rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translateY(-0.625rem);
  gap: 0.21875rem;
`

export const TypoWrap = styled.div`
  display: flex;
  gap: 0.625rem;
`

export const CountArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.0625rem;
  width: 6.25rem;
  height: 4.5rem;
  flex-shrink: 0;
`

export const CountSection = styled(ProfileSection)`
  width: 100%;
  height: 6rem;
  flex-shrink: 0;
  margin-top: 0.75rem;
  display: flex;
  padding: 0.75rem 1rem;
`

export const CountWrapperBig = styled.div`
  font-size: ${({ theme }) => theme.typography._20};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  padding-top: 0.5rem;
`

export const CountWrapperSmall = styled.div`
  font-size: ${({ theme }) => theme.typography._13};
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-weight: 500;
`
