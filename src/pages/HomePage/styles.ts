import { styled } from 'styled-components'
import { Box } from '~components/Box'

export const HomePage = styled.div`
  padding: 0 20px 31px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 56px);
`

export const Header = styled.header`
  padding: 12px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Visual = styled.div`
  margin-top: 24px;
`
export const CharacterWrapper = styled.div`
  margin: 8px auto 0;
  width: 240px;
  height: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WalkInfoArea = styled(Box)`
  padding: 20px 24px;
`
export const WalkInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 4px;
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
export const BellIconWrapper = styled.div`
  position: relative;
`
export const UnreadCircle = styled.span`
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: ${({ theme }) => theme.colors.brand.sub};
  top: 0;
  right: 0;
`
