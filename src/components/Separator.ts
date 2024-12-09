import { styled } from 'styled-components'

type SeparatorProps = {
  $height: number
}

export const Separator = styled.hr<SeparatorProps>`
  border: none;
  width: 1px;
  height: ${({ $height }) => $height + 'px'};
  background-color: ${({ theme }) => theme.colors.grayscale.gc_1};
`
