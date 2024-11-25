import { styled } from 'styled-components'

export const CheckDogProfileSection = styled.div`
  padding: 180px 20px 24px 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  height: 100dvh;

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
