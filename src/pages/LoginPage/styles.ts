import { FontWeight, styled } from 'styled-components'
import Kakao_Icon from '~assets/kakao_icon.svg?react'
import Naver_Icon from '~assets/naver_icon.svg?react'
import Google_Icon from '~assets/google_icon.svg?react'
import { FOOTER_HEIGHT } from '~constants/layout'

export const LoginPageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  height: 100%;
  min-height: calc(100dvh - ${FOOTER_HEIGHT}px);

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  padding: 50px 20px;
  position: relative;
  overflow: hidden;
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
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};

  display: flex;
  justify-content: center;
  align-items: center;

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
  width: calc(100% - 12px); // 변경: 동적 너비 계산 (부모 크기 - 좌우 마진)
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
`
export const Kakao = styled(SocialButtonBase)`
  background: #ffed16;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
`
export const Naver = styled(SocialButtonBase)`
  background: #03cf5d;
  color: ${({ theme }) => theme.colors.grayscale.gc_4};
`
export const Google = styled(SocialButtonBase)`
  background: #f2f2f2;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
`
export const KakaoIcon = styled(Kakao_Icon)`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 24px;
`
export const NaverIcon = styled(Naver_Icon)`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 24px;
`
export const GoogleIcon = styled(Google_Icon)`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 24px;
`
