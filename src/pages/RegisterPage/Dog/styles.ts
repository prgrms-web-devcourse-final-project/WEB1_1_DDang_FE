import { styled } from 'styled-components'

export const RegisterDogPage = styled.div`
  padding: 120px 20px 24px 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  @media (max-height: 700px) {
    padding: 100px 20px 24px 20px;
  }
`

export const TypoWrapper = styled.div`
  text-align: start;
  margin-bottom: 40px;
`

export const ButtonWrapper = styled.div`
  display: grid;
  gap: 12px;
`
