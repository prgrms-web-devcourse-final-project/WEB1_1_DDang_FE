import { GrayscaleColors, styled } from 'styled-components'

type TypoProps = {
  color?: keyof GrayscaleColors
  weight?: 300 | 400 | 700 | 800
}

const Typo = styled.p<TypoProps>`
  color: ${({ color }) => (color ? color : 'inherit')};
  font-weight: ${({ weight }) => (weight ? weight : 400)};
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
