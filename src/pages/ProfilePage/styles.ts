import { styled } from 'styled-components'
import { Box } from '~components/Box'
import DefaultHeader from '~components/Header'
import { Typo13, Typo15, Typo24 } from '~components/Typo'
import { FOOTER_HEIGHT, HEADER_HEIGHT } from '~constants/layout'

export const ProfilePage = styled.div`
  padding: ${HEADER_HEIGHT}px 20px ${FOOTER_HEIGHT + 20}px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
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
  flex: 3;
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
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const WalkInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
`
export const DogInfoArea = styled(Box)`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`

export const DogDetailWrapper = styled.div``
