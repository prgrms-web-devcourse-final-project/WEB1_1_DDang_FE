import { FontWeight, styled } from 'styled-components'
import { ActionButton } from '~components/Button/ActionButton'
import Header from '~components/Header'

export const RegisterAvatarModal = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 20px 20px 24px 20px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  overflow: hidden;
  @media (max-height: 700px) {
    padding: 76px 20px 16px;
    gap: 0.5rem;
  }
`
export const HeaderArea = styled(Header)`
  justify-content: flex-end;
  width: 100%;
  padding-right: 20px;
  height: auto;
  border-radius: 1px solid red;
`

export const TextSection = styled.text<{ weight: FontWeight }>`
  position: sticky;
  margin-top: 2rem;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._20};
  font-weight: ${({ weight }) => weight};
  white-space: pre-line;
  text-align: center;
  padding: 1.5rem 0;
`
export const CustomActionButton = styled(ActionButton)`
  font-weight: 700;
  position: fixed;
  bottom: 24px;
  width: calc(100% - 40px);
  z-index: 1;
`
export const SelectCharacterSection = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 1rem;
  padding: 0.1rem;
  margin-bottom: -1rem;
  width: 100%;
  overflow-y: auto;
  flex: 1;
  position: relative;
  z-index: 0;
  padding-bottom: 80px; // 버튼 높이만큼 패딩 추가

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 12px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.brand.lighten_2};
    border-radius: 5px;
  }
`

export const CharacterArea = styled.div<{ isSelected?: boolean; index: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 157px;
  height: 157px;
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
  width: '64',
  height: '64',
  viewBox: '0 0 48 48',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
})`
  width: 55px;
  height: 55px;
`

export const CheckPath = styled.path.attrs({
  d: 'M6 24L18 36L42 12',
  stroke: 'white',
  strokeWidth: '4',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})``
