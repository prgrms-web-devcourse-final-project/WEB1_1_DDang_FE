// styled.d.ts
import 'styled-components'

interface BrandColors {
  darken: string
  default: string
  lighten_1: string
  lighten_2: string
  lighten_3: string
  sub: string
}

interface GrayscaleColors {
  font_1: string
  font_2: string
  font_3: string
  font_4: string
  gc_1: string
  gc_2: string
  gc_3: string
  gc_4: string
}

interface Colors {
  brand: BrandColors
  grayscale: GrayscaleColors
}

interface Typography {
  _24: string
  _20: string
  _17: string
  _15: string
  _14: string
  _13: string
  _11: string
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: Colors
    typography: Typography
  }
}
