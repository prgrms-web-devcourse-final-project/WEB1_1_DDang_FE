import { styled } from 'styled-components'

export const LoginPageContainer = styled.div`
  width: 375px;
  height: 698px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0;
`
export const TitleSection = styled.div`
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: 28px;
  font-weight: 700;
  white-space: pre-line; //줄바꿈!
  text-align: center;
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
