import { styled } from 'styled-components'

export const CountSection = styled.div`
  width: 100%;
  height: 6rem;
  flex-shrink: 0;
  margin-top: 0.75rem;
  display: flex;
  padding: 0.75rem 1rem;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  border-radius: 1rem;
`

export const CountArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.0625rem;
  width: 6.25rem;
  height: 4.5rem;
  flex-shrink: 0;
`

export const CountWrapperBig = styled.div`
  font-size: ${({ theme }) => theme.typography._20};
  font-weight: 800;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  padding-top: 0.5rem;
`

export const CountWrapperSmall = styled.div`
  font-size: ${({ theme }) => theme.typography._13};
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-weight: 500;
`
