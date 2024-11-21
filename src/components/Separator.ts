import { styled } from 'styled-components'

export const Separator = styled.hr`
  border: none;
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_1};
`
