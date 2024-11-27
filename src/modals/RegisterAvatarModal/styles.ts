import { FontWeight, styled } from 'styled-components'
import { ActionButton } from '~components/Button/ActionButton'
import Header from '~components/Header'

export const RegisterAvatarModal = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 1.25rem 0.938rem 1.5rem 1.25rem;
  position: relative;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  overflow: hidden;
  @media (max-height: 700px) {
    padding: 4.75rem 1.25rem 1rem;
    gap: 0.5rem;
  }
`

export const HeaderArea = styled(Header)`
  justify-content: flex-end;
`

export const TextSection = styled.text<{ weight: FontWeight }>`
  margin-top: 1.9rem;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._20};
  font-weight: ${({ weight }) => weight};
  white-space: pre-line;
  text-align: center;
  padding: 1.5rem 0;
`

const BaseCustomActionButton = styled(ActionButton)`
  font-weight: 700;
  position: fixed;
  bottom: 1.5rem;
  width: calc(100% - 2.5rem);
  z-index: 1;
`
export const CustomActionButton = styled(BaseCustomActionButton)<{ isSelected: boolean }>`
  ${({ isSelected, theme }) =>
    !isSelected &&
    `
    background-color: ${theme.colors.brand.lighten_3};
    color: ${theme.colors.grayscale.font_2};
  `}
`

export const SelectCharacterSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
  padding: 0.1rem 0 5rem 0.3rem;
  margin-bottom: -1rem;
  width: 100%;
  overflow-y: auto;
  flex: 1;
  position: relative;
  z-index: 0;

  &::-webkit-scrollbar {
    width: 0.75rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.brand.lighten_2};
    border-radius: 0.313rem;
  }
`

export const CharacterArea = styled.div<{ index: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 9.063rem;
  height: 9.063rem;
  border-radius: 50%;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
    transform: ${({ index }) => ([2, 3, 4, 6, 8, 9].includes(index) ? 'scale(1.1)' : 'scale(1)')};
  }
`

export const SelectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.grayscale.font_1};
  opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const CheckIcon = styled.svg.attrs({
  viewBox: '0 0 48 48',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
})`
  width: 3.438rem; // 55px
  height: 3.438rem; // 55px
`

export const CheckPath = styled.path.attrs({
  d: 'M6 24L18 36L42 12',
  stroke: 'white',
  strokeWidth: '4',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})``
