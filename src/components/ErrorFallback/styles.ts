import { styled } from 'styled-components'

export const ErrorFallback = styled.div`
  padding: 20px;
  margin: 0 auto;
  width: 100%;
`
export const ResetButton = styled.button`
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.brand.default};
  color: ${({ theme }) => theme.colors.grayscale.gc_4};
  width: 100%;
  border-radius: 10px;
  margin-top: 4px;
`
