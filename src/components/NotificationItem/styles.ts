import { styled } from 'styled-components'

export const NotificationItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.gc_1};
`

export const Dot = styled.div`
  border-radius: 50%;
  width: 3px;
  height: 3px;
  background-color: ${({ theme }) => theme.colors.brand.sub};
`
export const TypoArea = styled.div``
