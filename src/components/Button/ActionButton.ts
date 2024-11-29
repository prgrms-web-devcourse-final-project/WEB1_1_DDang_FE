import styled, { BrandColors, FontWeight, GrayscaleColors, Typography } from 'styled-components'

type BgColorType =
  | Extract<keyof BrandColors, 'default' | 'lighten_2'>
  | Extract<keyof GrayscaleColors, 'gc_4' | 'gc_1' | 'font_1'>

type ActionButtonProps = {
  $bgColor?: BgColorType
  $type?: 'roundedRect' | 'semiRoundedRect' | 'capsule'
  $fontWeight?: FontWeight
}

type ActionButtonStyles = {
  padding: string
  borderRadius: string
  fontSize: keyof Typography
}

const ACTION_BUTTON_FONT_COLORS: Record<BgColorType, keyof GrayscaleColors> = {
  default: 'gc_4',
  lighten_2: 'font_1',
  font_1: 'gc_4',
  gc_4: 'font_1',
  gc_1: 'font_4',
} as const

const ACTION_BUTTON_STYLES: Record<Exclude<ActionButtonProps['$type'], undefined>, ActionButtonStyles> = {
  roundedRect: {
    padding: '15.5px 24px',
    borderRadius: '12px',
    fontSize: '_14',
  },
  semiRoundedRect: {
    padding: '16.5px 24px',
    borderRadius: '12px',
    fontSize: '_15',
  },
  capsule: {
    padding: '18px 24px',
    borderRadius: '100px',
    fontSize: '_17',
  },
}

export const ActionButton = styled.button<ActionButtonProps>`
  width: 100%;
  background-color: ${({ theme, $bgColor = 'default' }) =>
    theme.colors.grayscale[$bgColor as keyof GrayscaleColors] || theme.colors.brand[$bgColor as keyof BrandColors]};
  color: ${({ theme, $bgColor = 'default' }) => theme.colors.grayscale[ACTION_BUTTON_FONT_COLORS[$bgColor]]};
  padding: ${({ $type = 'capsule' }) => ACTION_BUTTON_STYLES[$type]?.padding};
  border-radius: ${({ $type = 'capsule' }) => ACTION_BUTTON_STYLES[$type]?.borderRadius};
  font-size: ${({ theme, $type = 'capsule' }) => theme.typography[ACTION_BUTTON_STYLES[$type]?.fontSize]};
  font-weight: ${({ $fontWeight }) => $fontWeight};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.brand.lighten_3};
    color: ${({ theme }) => theme.colors.grayscale.font_2};
    font-weight: ${({ $fontWeight }) => $fontWeight};
    cursor: not-allowed;
  }
`
