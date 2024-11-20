import { styled } from 'styled-components'

export const ToggleBox = styled.div`
  padding: 18px 16px 18px 20px;
  display: flex;
  justify-content: space-between;
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
