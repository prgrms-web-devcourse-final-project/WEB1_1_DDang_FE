import { DefaultTheme } from 'styled-components'

const brand = {
  darken: '#462008',
  default: '#783D16',
  lighten_1: '#ECB99A',
  lighten_2: '#E8DCD4',
  lighten_3: '#F4F0ED',
  sub: '#6CA719',
} as const

export type BrandKey = keyof typeof brand

const grayscale = {
  font_1: '#111111', // 기본 텍스트 색상
  font_2: '#505050',
  font_3: '#767676',
  font_4: '#999999',
  gc_1: '#E5E5EC', // 배경 색상
  gc_2: '#F1F1F5',
  gc_3: '#F7F7FB',
  gc_4: '#FFFFFF', // 가장 밝은 배경
} as const

export type GrayscaleKey = keyof typeof grayscale

const grayscaleDark = {
  font_1: '#FFFFFF', // 어두운 모드에서 기본 텍스트 색상
  font_2: '#E5E5EC', // 밝은 회색 톤의 텍스트
  font_3: '#999999',
  font_4: '#767676',
  gc_1: '#111111', // 어두운 배경 색상
  gc_2: '#505050',
  gc_3: '#767676',
  gc_4: '#999999',
} as const

export const typography = {
  _24: '24px',
  _20: '20px',
  _17: '17px',
  _15: '15px',
  _14: '14px',
  _13: '13px',
  _11: '11px',
} as const

export const lightTheme: DefaultTheme = {
  colors: {
    brand,
    grayscale,
  },
  typography,
}

export const darkTheme: DefaultTheme = {
  colors: {
    brand,
    grayscale: grayscaleDark,
  },
  typography,
}
