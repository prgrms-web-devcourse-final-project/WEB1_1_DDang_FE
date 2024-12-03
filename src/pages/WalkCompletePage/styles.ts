import { styled } from 'styled-components'
import WalkCompleteDog from '~assets/result_dog.svg?react'
import { Box } from '~components/Box'
import { Typo13, Typo17, Typo20 } from '~components/Typo'
import { FOOTER_HEIGHT } from '~constants/layout'

export const WalkCompletePage = styled.div`
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
  width: 100%;
  height: calc(100dvh - ${FOOTER_HEIGHT}px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Date = styled(Typo17)`
  font-weight: 700;
  color: #333;
`

export const Title = styled(Typo20)`
  font-weight: 800;

  span {
    color: #8b4513;
  }
`

export const WalkStats = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 22px 33px;
  /* border-radius: 12px; */
`

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const StatValue = styled(Typo20)`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
`

export const StatLabel = styled(Typo13)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
`

export const MapSection = styled.div`
  width: 100%;
  height: 240px;
  border-radius: 12px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const DogImageArea = styled.div`
  display: flex;
  justify-content: right;
`

export const DogImage = styled(WalkCompleteDog)`
  width: 142px;
  height: 151px;
  display: flex;
`
