import { BrandColors, FontWeight, GrayscaleColors, styled } from 'styled-components'

type TypoProps = {
  $color?: keyof GrayscaleColors | keyof BrandColors
  $weight?: FontWeight
  $textAlign?: 'left' | 'center' | 'right'
}

const Typo = styled.p<TypoProps>`
  color: ${({ theme, $color }) =>
    theme.colors.grayscale[$color as keyof GrayscaleColors] ||
    theme.colors.brand[$color as keyof BrandColors] ||
    'inherit'};
  text-align: ${({ $textAlign = 'left' }) => $textAlign};
  font-weight: ${({ $weight: weight }) => (weight ? weight : 400)};
  white-space: pre-line;
`

export const Typo11 = styled(Typo)`
  font-size: ${({ theme }) => theme.typography._11};
`

export const Typo13 = styled(Typo)`
  font-size: ${({ theme }) => theme.typography._13};
`

export const Typo14 = styled(Typo)`
  font-size: ${({ theme }) => theme.typography._14};
`

export const Typo15 = styled(Typo)`
  font-size: ${({ theme }) => theme.typography._15};
`

export const Typo17 = styled(Typo)`
  font-size: ${({ theme }) => theme.typography._17};
`

export const Typo20 = styled(Typo)`
  font-size: ${({ theme }) => theme.typography._20};
`

export const Typo24 = styled(Typo)`
  font-size: ${({ theme }) => theme.typography._24};
`
