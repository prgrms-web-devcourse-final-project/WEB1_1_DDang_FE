import { styled } from 'styled-components'
import { Box } from '~components/Box'

export const TypoWrapper = styled.div<{ $gap?: number }>`
  display: flex;
  align-items: center;
  gap: ${({ $gap = 4 }) => $gap}px;
  margin-bottom: 0.1rem;
  margin-top: 1rem;
`
export const TyopNameWrapper = styled.div`
  margin-right: 0.3rem;
  margin-bottom: 0.4rem;
`

export const Breed = styled.div`
  font-size: 15px;
  max-width: 83px;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const EditIconWrapper = styled.div`
  position: absolute;
  right: 29px;
  width: 2rem;
  height: 2rem;
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
`

export const DogInfoArea = styled(Box)`
  padding: 16px 20px;
  position: relative;
`
export const DogInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`
export const DogDetailInfoWrapper = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  margin-bottom: 1rem;
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
