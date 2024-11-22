import { styled } from 'styled-components'

const Message = styled.div`
  padding: 9.5px 16px;
  border-radius: 12px;
  white-space: pre-line;
  margin: 16px 0;
`
export const OutgoingMessage = styled(Message)`
  margin-left: auto;
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
`
export const IncomingMessage = styled(Message)`
  width: fit-content;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
`
