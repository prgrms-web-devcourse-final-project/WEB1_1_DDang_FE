import { FontWeight, styled } from 'styled-components'

export const RegisterAvatarModal = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 120px 20px 24px 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};

  @media (max-height: 700px) {
    padding: 76px 20px 16px;
    gap: 0.5rem;
  }
`

export const CloseButton = styled.div`
  border: 1px solid red;
`

export const TextSection = styled.text<{ weight: FontWeight }>`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._24};
  font-weight: ${({ weight }) => weight};
  white-space: pre-line;
  text-align: center;
`
