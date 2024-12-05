import { styled } from 'styled-components'
import { HEADER_HEIGHT } from '~constants/layout'

export const ShareCodeModal = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  overflow: hidden;
  padding: ${HEADER_HEIGHT + 30}px 90px 0 20px;

  @media (max-height: 700px) {
    padding: 3.3rem 1.25rem 1rem;
    gap: 0.5rem;
  }
`

export const MainContainer = styled.div`
  margin: 1rem;
`

export const CommentSection = styled.div`
  border: 1px solid red;
`

export const DogImageWrapper = styled.div`
  white-space: pre-line;
  padding-bottom: 1rem;
  padding-left: 10rem;
  justify-content: left;
  width: 137.651px;
  height: 176px;
`

export const CodeShareSection = styled.div``

export const CodeShareButtonWrapper = styled.div``

export const CodeShareButton = styled.div``
