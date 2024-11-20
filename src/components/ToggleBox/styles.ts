import { styled } from 'styled-components'

export const ToggleBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 16px 18px 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  &:first-of-type {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  &:last-of-type {
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }
`

export const MainArea = styled.div``
