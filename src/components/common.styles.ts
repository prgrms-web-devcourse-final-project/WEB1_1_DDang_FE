import { BrandColors, GrayscaleColors } from '@/styles/styled'
import { styled } from 'styled-components'

type ActionButtonProps = {
  $bgColor:
    | Extract<keyof BrandColors, 'default' | 'lighten_2'>
    | Extract<keyof GrayscaleColors, 'gc_4' | 'gc_1' | 'font_1'>
  $type: 'roundedRect' | 'semiRoundedRect' | 'capsule'
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
  background-color: ${({ theme, $bgColor: bgColor }) =>
    theme.colors.grayscale[bgColor as keyof GrayscaleColors] || theme.colors.brand[bgColor as keyof BrandColors]};
  color: ${({ $bgColor: bgColor, theme }) => theme.colors.grayscale[buttonFontColorMap[bgColor]]};
  border-radius: ${({ $type: type }) =>
    type === 'roundedRect' ? '12px' : type === 'semiRoundedRect' ? '20px' : '100px'};
  font-size: ${({ $type: type, theme }) =>
    type === 'roundedRect'
      ? theme.typography._14
      : type === 'semiRoundedRect'
        ? theme.typography._15
        : theme.typography._17};
`

export const Input = styled.input`
  width: 100%;
  border: none;
  font-size: ${({ theme }) => theme.typography._20};
  text-align: center;
  /* transition: 0.15s box-shadow; */
  padding: 17px 32px;
  border-radius: 12px;
  &:focus {
    box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.colors.grayscale.font_1}`};
  }
`
