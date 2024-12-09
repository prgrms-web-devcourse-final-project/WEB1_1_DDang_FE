import styled from 'styled-components'

export const EditDogProfileModal = styled.div`
  z-index: 100;
  overflow-y: auto;
  padding: 90px 20px 24px 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  gap: 20px;

  &::-webkit-scrollbar {
    display: none;
  }
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
  margin-bottom: 30px;
`

export const AddDogPictureBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  flex-direction: column;
  gap: 16px;
`
export const AddPicture = styled.button`
  background-color: black;
  color: ${props => props.theme.colors.grayscale.gc_4};
  width: 75px;
  height: 32px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  align-self: center;
`

export const AddDogPictureBtn = styled.div`
  align-self: center;
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
`

export const HiddenFileInput = styled.input`
  display: none;
`

export const DogImage = styled.img<{ $hasImage: boolean }>`
  background-color: ${props => props.theme.colors.grayscale.gc_4};
  border: solid 2px ${props => props.theme.colors.grayscale.gc_2};
  position: absolute;
  z-index: ${({ $hasImage }) => ($hasImage ? '100' : '-100')};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`

export const InputArea = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

export const PickerBtn = styled.div<{ $hasBreed: boolean }>`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  font-size: ${({ theme }) => theme.typography._20};
  color: ${({ theme, $hasBreed }) => ($hasBreed ? 'black' : theme.colors.grayscale.font_3)};
  font-weight: ${({ $hasBreed }) => ($hasBreed ? 'bold' : 'default')};
  cursor: pointer;
`

export const DatePickerBtn = styled.div<{ $hasBirth: boolean }>`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  font-size: ${({ theme }) => theme.typography._20};
  color: ${({ theme, $hasBirth }) => ($hasBirth ? 'black' : theme.colors.grayscale.font_3)};
  font-weight: ${({ $hasBirth }) => ($hasBirth ? '700' : '400')};
  cursor: pointer;
`

export const WeightInput = styled.input<{ $hasWeight: boolean }>`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography._20};
  font-weight: ${({ $hasWeight }) => ($hasWeight ? 'bold' : 'default')};
  &:focus {
    box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.colors.grayscale.font_1}`};
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type='number'] {
    -moz-appearance: textfield;
  }
`

export const GenderBtnArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const GenderSelectBtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`

export const CheckboxWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 20px;
`

export const CheckboxCircle = styled.div<{ $isChecked: boolean }>`
  border: solid 1px red;
  width: 24px;
  height: 24px;
  border: 2px solid ${({ $isChecked }) => ($isChecked ? '#000' : '#ccc')};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const CheckboxLabel = styled.span<{ $isChecked: boolean }>`
  color: ${({ $isChecked }) => ($isChecked ? '#000' : '#ccc')};
`

export const TwoLineinputWrapper = styled.div`
  height: 100px;
  margin-bottom: 10px;
`

export const ToastWrapper = styled.div`
  position: relative;
`
