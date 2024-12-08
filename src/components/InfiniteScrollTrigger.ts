import { styled } from 'styled-components'

type InfiniteScrollTriggerProps = {
  $height?: number
}
export const InfiniteScrollTrigger = styled.div<InfiniteScrollTriggerProps>`
  height: ${({ $height = 30 }) => $height + 'px'};
  display: flex;
  justify-content: center;
  align-items: center;
`
