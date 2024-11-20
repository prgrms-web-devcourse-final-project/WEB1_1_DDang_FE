import { BrandKey, GrayscaleKey } from '@/styles/theme'
import { styled } from 'styled-components'

type ActionButtonProps = {
  bgColor: Extract<BrandKey, 'default' | 'lighten_2'> | Extract<GrayscaleKey, 'gc_4' | 'gc_1' | 'font_1'>
  rounded: 'regular' | 'full'
}

const buttonFontColorMap = {
  default: 'gc_4',
  lighten_2: 'font_1',
  font_1: 'gc_4',
  gc_4: 'font_1',
  gc_1: 'font_4',
} as const

export const ActionButton = styled.button<ActionButtonProps>`
  width: 100%;
  padding: 1rem;
  background-color: ${({ bgColor, theme }) =>
    bgColor.includes('gc') || bgColor.includes('font')
      ? theme.colors.grayscale[bgColor as Extract<GrayscaleKey, 'gc_4' | 'gc_1' | 'font_1'>]
      : theme.colors.brand[bgColor as Extract<BrandKey, 'default' | 'lighten_2'>]};
  color: ${({ bgColor, theme }) => theme.colors.grayscale[buttonFontColorMap[bgColor]]};
  border-radius: ${({ rounded }) => (rounded === 'regular' ? '12px' : '100px')};
  font-size: ${({ rounded, theme }) =>
    rounded === 'regular' ? theme.typography.suitVariable15pt : theme.typography.suitVariable17pt};
`

export const Input = styled.input`
  width: 100%;
  border: none;
  text-align: center;
  /* transition: 0.15s box-shadow; */
  padding: 17px 32px;
  border-radius: 12px;
  &:focus {
    box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.colors.grayscale.font_1}`};
  }
`
