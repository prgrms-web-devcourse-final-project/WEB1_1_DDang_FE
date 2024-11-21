import { styled } from 'styled-components'

type ToggleBoxProps = {
  $type: 'sm' | 'md' | 'lg'
}

const TOGGLE_BOX_PADDING = {
  sm: '15.5px 16px 15.5px 20px',
  md: '16.5px 16px 16.5px 20px',
  lg: '18px 16px 18px 20px',
}
export const ToggleBox = styled.div<ToggleBoxProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ $type }) => TOGGLE_BOX_PADDING[$type]};
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
