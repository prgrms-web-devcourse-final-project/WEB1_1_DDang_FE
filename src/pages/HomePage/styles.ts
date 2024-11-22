import { styled } from 'styled-components'
import { Box } from '~components/Box'
import { FOOTER_HEIGHT } from '~constants/layout'

export const HomePage = styled.div`
  padding: 0 20px 31px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100dvh - ${FOOTER_HEIGHT}px);
`

export const Header = styled.header`
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Visual = styled.div`
  margin-top: 24px;
  text-align: center;
`
export const CharacterWrapper = styled.div`
  margin: 8px auto 0;
  width: 240px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`
export const Character = styled.div`
  width: 148px;
  height: 148px;
  background-color: ${({ theme }) => theme.colors.brand.lighten_1};
  border-radius: 50%;
`
export const WalkInfoArea = styled(Box)`
  padding: 20px 24px;
`
export const WalkInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 6px;
  padding: 0 6px;
`
export const WalkTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WalkDistance = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
