import styled from 'styled-components'

export const WalkSummary = styled.div`
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 500;
  background-color: ${props => props.theme.colors.grayscale.gc_4};
  border-radius: 12px;

  display: flex;
  flex-direction: column;
`
export const UserProfile = styled.div`
  height: 24px;
  display: flex;
  align-items: center;
  gap: 5px;
`

export const ProfileImg = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 24px;
  height: 24px;
`

export const UserName = styled.p`
  color: ${props => props.theme.colors.grayscale.font_1};
  transform: translateY(1px);
`

export const WalkPhoto = styled.div`
  margin: 10px 0 4px 0;
  img {
    width: 100%;
    object-fit: cover;
  }
`

export const WalkInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 23px;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    img {
      transform: translateY(-1px);
    }
    &:nth-of-type(2) {
      border-right: 1px solid ${props => props.theme.colors.grayscale.gc_1};
      border-left: 1px solid ${props => props.theme.colors.grayscale.gc_1};
    }
  }
`
