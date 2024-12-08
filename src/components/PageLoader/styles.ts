import { styled, keyframes } from 'styled-components'

export const PageLoader = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
`

const dogAnimation = keyframes`
  0%, 24% { opacity: 1; }
  25%, 100% { opacity: 0; }
`

export const DogAnimation = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  width: 50%;
  height: 50%;

  & > svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    animation: ${dogAnimation} 1s steps(1) infinite;
  }

  & > svg:nth-child(2) {
    animation-delay: 0.25s;
  }

  & > svg:nth-child(3) {
    animation-delay: 0.5s;
  }

  & > svg:nth-child(4) {
    width: 92%;
    height: 92%;
    animation-delay: 0.75s;
  }
`
