import { styled } from 'styled-components'
import { Box } from '~components/Box'
import DefaultHeader from '~components/Header'
import { Typo13, Typo15, Typo24 } from '~components/Typo'
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '~constants/layout'
import DogFood from '~assets/dog_food.svg'

export const ProfilePage = styled.div`
  padding: ${HEADER_HEIGHT}px 20px ${FOOTER_HEIGHT + 20}px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: url(${DogFood}) no-repeat bottom 85px center;
  background-size: 40%;
  @media screen and (max-height: 900px) {
    background: none;
    gap: 24px;
  }
`
export const Header = styled(DefaultHeader)`
  background-color: inherit;
`

export const TypoWrapper = styled.div<{ $gap?: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap = 4 }) => $gap}px;
`

export const ProfileArea = styled(Box)`
  height: 285px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px 0;

  & > ${Typo24}, & > ${TypoWrapper} > ${Typo13} {
    margin-top: 8px;
  }

  & > ${Typo15} {
    margin-top: 2px;
  }
`
export const WalkInfoArea = styled(Box)`
  height: 96px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  flex-shrink: 0;
`
export const WalkInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`
export const DogInfoArea = styled(Box)`
  padding: 16px 20px;
`
export const DogInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const DogDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
export const OneLineIntro = styled(Box)`
  margin-top: 12px;
  display: flex;
  gap: 4px;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
  padding: 12px 20px;
  border-top-left-radius: 0;
  @media screen and (max-height: 750px) {
    display: none;
  }
`
