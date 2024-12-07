import { styled } from 'styled-components'
import { HEADER_HEIGHT } from '~constants/layout'

export const ShareCodeModal = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  overflow: hidden;
  padding: ${HEADER_HEIGHT + 52}px 90px 0 20px;

  @media (max-height: 700px) {
    padding: ${HEADER_HEIGHT + 52}px 1.25rem 1rem;
    gap: 0.5rem;
  }
`

export const MainContainer = styled.div`
  margin: 1rem;
`

export const CommentSection = styled.div``

export const DogImageWrapper = styled.div`
  white-space: pre-line;
  padding-bottom: 1rem;
  padding-left: 10rem;
  justify-content: left;
  width: 137.651px;
  height: 176px;
`

export const CodeShareSection = styled.div`
  position: absolute;
  bottom: 17rem;
  left: 20px;
  right: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.grayscale.gc_2};
  padding-bottom: 40px;
`

export const CodeShareButtonWrapper = styled.div``

export const CodeShareButton = styled.div`
  border-radius: 12px;
  background: #ecf9da;
  display: flex;
  width: 335px;
  padding: 16.5px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.brand.sub};
`
