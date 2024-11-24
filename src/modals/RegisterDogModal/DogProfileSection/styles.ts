import { styled } from 'styled-components'

export const DogProfileSection = styled.div`
  padding: 120px 20px 24px 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  height: 100dvh;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-height: 700px) {
    padding: 100px 20px 24px 20px;
  }
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
  position: relative;
  overflow: hidden;
  width: 180px;
  height: 180px;
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;

  font-weight: 700;
  color: ${({ theme }) => theme.colors.brand.darken};
  cursor: pointer;
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const DogImage = styled.img<{ hasImage: boolean }>`
  position: absolute;
  z-index: ${({ hasImage }) => (hasImage ? '100' : '-100')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-height: 700px) {
    margin-bottom: 40px;
    gap: 0.3rem;
  }
`

export const NameInput = styled.input`
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
    font-weight: 400;
  }
`

export const DatePickerBtn = styled.div<{ hasBirth: boolean }>`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  font-size: ${({ theme }) => theme.typography._20};
  color: ${({ theme, hasBirth }) => (hasBirth ? 'black' : theme.colors.grayscale.font_3)};
  font-weight: ${({ hasBirth }) => (hasBirth ? '700' : '400')};
  cursor: pointer;
`
export const ActionButtonArea = styled.div`
  position: relative;
`
export const AlertFormWrapper = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: -50px;

  width: 100%;
  display: flex;
  justify-content: center;

  visibility: ${({ isVisible }) => (isVisible ? 'visiblie' : 'hidden')};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  /* transform: translateY(${({ isVisible }) => (isVisible ? '0' : '10px')}); */
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;
`
