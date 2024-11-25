import { FontWeight, styled } from 'styled-components'
import Kakao_Icon from '~assets/kakao_icon.svg?react'
import Naver_Icon from '~assets/naver_icon.svg?react'
import Google_Icon from '~assets/google_icon.svg?react'

const SOCIAL_COLORS = {
  KAKAO: '#ffed16',
  NAVER: '#03cf5d',
  GOOGLE: '#f2f2f2',
} as const

const LAYOUT = {
  ICON_SIZE: '24px',
  ICON_LEFT_PADDING: '24px',
} as const

export const LoginPageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100dvh;

  padding: 50px 20px;
  position: relative;
`
export const TitleSection = styled.div`
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: 28px;
  font-weight: 700;
  white-space: pre-line; //줄바꿈!
  text-align: center;
  margin-top: 20%;
  margin-bottom: 30px;
`
export const BrandText = styled.span`
  color: ${({ theme }) => theme.colors.brand.default};
`
export const Logo = styled.div`
  width: 180px;
  height: 180px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
  font-size: ${({ theme }) => theme.typography._24};
  color: ${({ theme }) => theme.colors.grayscale.font_1};
`
//소셜로그인
export const SocialLoginSection = styled.div`
  width: 100%;
  max-width: 350px;
  height: 200px;
  margin-top: 50px;
`
const SocialButtonBase = styled.div<{ weight: FontWeight }>`
  width: calc(100% - 12px);
  height: 52px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography._14};
  font-weight: ${({ weight }) => weight};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px 6px;
  cursor: pointer;

  svg {
    position: absolute;
    left: 24px;
    width: ${LAYOUT.ICON_SIZE};
    height: ${LAYOUT.ICON_SIZE};
  }
`
export const Kakao = styled(SocialButtonBase)`
  background: ${SOCIAL_COLORS.KAKAO};
  color: ${({ theme }) => theme.colors.grayscale.font_1};
`
export const Naver = styled(SocialButtonBase)`
  background: ${SOCIAL_COLORS.NAVER};
  color: ${({ theme }) => theme.colors.grayscale.gc_4};
`
export const Google = styled(SocialButtonBase)`
  background: ${SOCIAL_COLORS.GOOGLE};
  color: ${({ theme }) => theme.colors.grayscale.font_1};
`
const IconBase = styled.svg`
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: ${LAYOUT.ICON_SIZE};
  height: ${LAYOUT.ICON_SIZE};
`
export const KakaoIcon = styled(Kakao_Icon)`
  ${IconBase}
`
export const NaverIcon = styled(Naver_Icon)`
  ${IconBase}
`
export const GoogleIcon = styled(Google_Icon)`
  ${IconBase}
`
