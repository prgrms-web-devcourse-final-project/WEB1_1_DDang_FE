import styled from 'styled-components'

export const UnreadChatCount = styled.span`
  position: absolute;
  right: 20px;
  display: block;
  border-radius: 22px;
  background-color: ${({ theme }) => theme.colors.brand.sub};
  min-width: 20px;

  padding: 1.5px 6px;
  color: ${({ theme }) => theme.colors.grayscale.gc_4};

  display: flex;
  justify-content: center;
  align-items: center;
`
