import { styled } from 'styled-components'

export const CheckDogProfileSection = styled.div`
  z-index: 200;
  padding: 180px 20px 24px 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-height: 750px) {
    padding: 110px 20px 24px 20px;
  }

  @media (max-height: 700px) {
    padding: 100px 20px 24px 20px;
  }
`

export const ProfileArea = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10%;
`

export const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`

export const TagWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

export const TypoWrapper = styled.div`
  text-align: center;
`

export const ActionButtonWrapper = styled.div`
  position: relative;
`
