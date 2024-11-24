import { styled } from 'styled-components'

export const FamilyCodeSection = styled.div`
    padding : 0 20px 24px 20px;
    background-color: ${({theme}) => theme.colors.grayscale.gc_4};
    height: 100dvh;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const PrevBtnWrapper = styled.div`
    height: 56px;

    @media (max-height: 700px) {
        margin-bottom: 10px;
    }
`

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;

    transform: translateY(-50px);
`

export const TypoWrapper = styled.div`
    text-align: center;
    width: 100%;
`
export const FamilyCodeInput = styled.input`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography._20};
  font-weight: 700;
  &:focus {
      box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.colors.grayscale.font_1}`};
    }
  &::placeholder {
    font-weight : 400;
  }
`