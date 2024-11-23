import { FontWeight, styled } from 'styled-components'
import Kakao_Icon from '~assets/kakao_icon.svg?react'
import Naver_Icon from '~assets/naver_icon.svg?react'
import Google_Icon from '~assets/google_icon.svg?react'

export const LoginPageContainer = styled.div`
  width: 100%;
  height: 100dvh;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};

  overflow: hidden;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
  align-items: center;
  flex-direction: column;
  display: flex;
`
export const TitleSection = styled.div`
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: 28px;
  font-weight: 700;
  white-space: pre-line; //줄바꿈!
  text-align: center;
  margin-top: 40%;
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
  /* border: 1px solid red; */
  width: 350px;
  height: 200px;
  margin-top: 50px;
`
export const Kakao = styled.div<{ weight: FontWeight }>`
  width: 335px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #ffed16;

  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._14};
  font-weight: ${({ weight }) => weight};

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px 6px;
  cursor: pointer;
`
export const KakaoIcon = styled(Kakao_Icon)`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 24px;
`
export const Naver = styled.div<{ weight: FontWeight }>`
  width: 335px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #03cf5d;

  color: ${({ theme }) => theme.colors.grayscale.gc_4};
  font-size: ${({ theme }) => theme.typography._14};
  font-weight: ${({ weight }) => weight};

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px 6px;
  cursor: pointer;
`
export const NaverIcon = styled(Naver_Icon)`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 24px;
`
export const Gogle = styled.div<{ weight: FontWeight }>`
  width: 335px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 12px;
  background: #f2f2f2;

  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._14};
  font-weight: ${({ weight }) => weight};

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 10px 6px;
  cursor: pointer;
`
export const GoogleIcon = styled(Google_Icon)`
  width: 24px;
  height: 24px;
  position: absolute;
  left: 24px;
`
