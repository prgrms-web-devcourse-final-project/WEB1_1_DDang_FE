import { styled } from 'styled-components'

const Message = styled.div`
  position: relative;
  padding: 9.5px 16px;
  border-radius: 12px;
  white-space: pre-line;
  margin: 16px 0;
`
export const IncomingMessage = styled(Message)`
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
  border-top-left-radius: 0;
`
export const OutgoingMessage = styled(Message)`
  margin-left: auto;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  width: fit-content;
  border-bottom-right-radius: 0;
`
