import { FontWeight, styled } from 'styled-components'
import { ActionButton } from '~components/Button/ActionButton'

export const RegisterAvatarModal = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
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
  position: sticky;
  top: 0;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._20};
  font-weight: ${({ weight }) => weight};
  white-space: pre-line;
  text-align: center;
`
export const CustomActionButton = styled(ActionButton)`
  /* position: sticky; */
  /* bottom: 0; */
  font-weight: 700;
`
export const SelectCharacterSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
  width: 100%;
  overflow-y: auto;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.brand.lighten_2};
    border-radius: 5px;
  }
`

export const CharacterArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`

// export const  = styled.text<{ weight: FontWeight }>``
// export const  = styled.text<{ weight: FontWeight }>``
// export const  = styled.text<{ weight: FontWeight }>``
// export const  = styled.text<{ weight: FontWeight }>``
// export const  = styled.text<{ weight: FontWeight }>``
