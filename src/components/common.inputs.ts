import { styled } from 'styled-components'

export const Input = styled.input`
  width: 100%;
  border: none;
  font-size: ${({ theme }) => theme.typography._20};
  text-align: center;
  /* transition: 0.15s box-shadow; */
  padding: 17px 32px;
  border-radius: 12px;
  &:focus {
    box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.colors.grayscale.font_1}`};
  }
`
