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
  ICON_SIZE: '1.5rem',
  ICON_LEFT_PADDING: '1.5rem',
} as const
//height: 100%를 추가, padding을 clamp() 사용 반응형으로 조정
export const LoginPage = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;

  padding: clamp(1.5rem, 5vh, 3rem) 1.25rem;
`
//flex-grow: 1을 추가 margin 대신 flex를 활용하여 공간을 조절
export const TitleSection = styled.div`
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: clamp(1.5rem, 4vw, 1.75rem);
  font-weight: 700;
  white-space: pre-line; //줄바꿈!
  text-align: center;
  flex-grow: 1;
  display: flex;
  align-items: center;
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
  flex-shrink: 0;
  margin: clamp(1rem, 3vh, 2rem) 0;

  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
  font-size: ${({ theme }) => theme.typography._24};
  color: ${({ theme }) => theme.colors.grayscale.font_1};
`
//소셜로그인
//flex container로 변경하고 flex-grow: 1을 추가하여 남은 공간 활용
export const SocialLoginSection = styled.div`
  width: 100%;
  max-width: 350px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: clamp(1rem, 3vh, 2rem);
`
//높이와 여백을 반응형으로 조정
const SocialButtonBase = styled.div<{ weight: FontWeight }>`
  width: 100%;
  height: clamp(3rem, 8vh, 3.25rem);
  border-radius: 0.75rem;
  font-size: ${({ theme }) => theme.typography._14};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 0.625rem 0;
  cursor: pointer;

  svg {
    position: absolute;
    left: 1.5rem;
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
  left: 1.5rem;
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
