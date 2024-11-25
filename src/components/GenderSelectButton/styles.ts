import { styled } from 'styled-components'
export const GenderBtn = styled.button<{ isActive: boolean }>`
  border: solid 2px ${({ isActive, theme }) => (isActive ? theme.colors.brand.darken : theme.colors.grayscale.gc_1)};
  border-radius: 8px;
  width: auto;
  height: 102px;
  color: ${({ isActive, theme }) => (isActive ? theme.colors.brand.darken : theme.colors.grayscale.font_3)};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
`

export const GenderIcon = styled.img<{ isActive: boolean }>`
  filter: ${props =>
    props.isActive
      ? 'invert(12%) sepia(70%) saturate(924%) hue-rotate(351deg) brightness(96%) contrast(97%)'
      : 'invert(31%) sepia(4%) saturate(61%) hue-rotate(332deg) brightness(99%) contrast(97%)'};
`
