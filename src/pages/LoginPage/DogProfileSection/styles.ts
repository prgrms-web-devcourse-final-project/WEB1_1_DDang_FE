import { styled } from 'styled-components'

export const DogProfileSection = styled.div`
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

export const TypoWrapper = styled.div`
    text-align: center;
`

export const AddDogPictureBtnWrapper = styled.div`
    display: flex;
    justify-content: center;
`

export const AddDogPictureBtn = styled.div`
    width: 180px;
    height: 180px;
    background-color: ${({theme}) => theme.colors.brand.lighten_2};
    border-radius: 50%;

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap : 0.5rem;

    font-weight : 700;
    color: ${({theme}) => theme.colors.brand.darken};
    cursor: pointer;
`

export const InputArea = styled.div`
    display: flex;
    flex-direction: column;

    @media (min-height: 700px) {
        margin-bottom: 40px;
        gap: 0.3rem;
    }
`

export const DatePickerBtn = styled.div`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  font-size: ${({ theme }) => theme.typography._20};
  color: ${({theme}) => theme.colors.grayscale.font_3};
  cursor: pointer;
`