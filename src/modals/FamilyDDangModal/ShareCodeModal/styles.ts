import { styled } from 'styled-components'
import { HEADER_HEIGHT } from '~constants/layout'
import FamilyInvitationImg from '~assets/family-invitaion.svg?react'
import FamilyDDangJoinImg from '~assets/familyddang-join.svg?react'

export const ShareCodeModal = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  position: relative;
  isolation: isolate;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  overflow: hidden;
  padding: ${HEADER_HEIGHT + 52}px 20px 27px 20px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-height: 700px) {
    padding: ${HEADER_HEIGHT + 52}px 1.25rem 1rem;
    gap: 0.5rem;
  }
`

export const MainContainer = styled.div`
  margin: 1rem;
`

export const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 300px;
`

export const DogImageWrapper = styled.div`
  position: absolute;
  z-index: -1;
  top: 200px;
  right: 40px;
  width: 137.651px;
  height: 176px;
`

export const CodeShareSection = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.grayscale.gc_2};
  padding-bottom: 30px;
  margin-bottom: 40px;
`

export const FamilyCode = styled.p`
  color: black;
  font-weight: 700;
`

export const CodeShareButtonWrapper = styled.div`
  position: relative;
`

export const CodeShareButton = styled.div`
  border-radius: 12px;
  background: #ecf9da;
  display: flex;
  width: 100%;
  padding: 16.5px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.brand.sub};
`

export const TimerWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 10px;
  justify-content: center;
`

export const Timer = styled.p`
  font-weight: 700;
  color: red;
`

export const Manual = styled.div`
  display: flex;
  flex-direction: column;
  gap: 27px;
`

export const FamilyInvitaion = styled(FamilyInvitationImg)`
  width: 100%;
  height: auto;
`

export const FamlyDDangJoin = styled(FamilyDDangJoinImg)`
  width: 100%;
  height: auto;
`
