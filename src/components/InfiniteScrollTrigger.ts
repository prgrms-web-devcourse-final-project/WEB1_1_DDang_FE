import { styled } from 'styled-components'

type InfiniteScrollTriggerProps = {
  $height?: number
}
export const InfiniteScrollTrigger = styled.div<InfiniteScrollTriggerProps>`
  height: ${({ $height = 20 }) => $height + 'px'};
`
