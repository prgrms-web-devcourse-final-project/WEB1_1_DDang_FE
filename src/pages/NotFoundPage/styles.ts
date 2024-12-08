import { styled } from 'styled-components'

export const NotFoundPage = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 20px 30%;
`

export const ErrorMessage = styled.p`
  font-size: 64px;
  text-align: center;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.brand.default};
`
export const Wrapper = styled.div`
  position: absolute;
  bottom: 12%;
`
