import { styled } from 'styled-components'
import { Box } from '~components/Box'
import BasicHeader from '~components/Header'
import { HEADER_HEIGHT, FOOTER_HEIGHT } from '~constants/layout'

export const FamilyDDang = styled.div`
  padding: ${HEADER_HEIGHT}px 20px ${FOOTER_HEIGHT + 20}px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Header = styled(BasicHeader)`
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
`

export const FamilySection = styled(Box)`
  padding: 0.5rem 1.75rem;
  width: 100%;
  height: auto;
  margin-bottom: 0.75rem;
`
export const IconWrapper = styled.div`
  margin-left: auto;
  margin-top: 0.7rem;
  cursor: pointer;
`
export const ProfileOneArea = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1.25rem 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.grayscale.gc_2};
  }
`

export const FamilyInfoArea = styled.div`
  gap: 1rem;
`
export const LineWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`
export const EditIconWrapper = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  margin-left: auto;
  cursor: pointer;
`

export const InviteSection = styled(Box)`
  padding: 0.6rem 1em 0.6rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
`

export const InviteBtn = styled.button`
  width: 57px;
  height: 36px;
  display: flex;
  padding: 0.5rem;
  border-radius: 0.75rem;
  background: #ecf9da;
  color: ${({ theme }) => theme.colors.brand.sub};
  line-height: 150%;
  justify-content: center;
  cursor: pointer;
`
