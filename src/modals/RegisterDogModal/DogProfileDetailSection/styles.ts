import { styled } from 'styled-components'

export const DogProfileDetailSection = styled.div`
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
export const GenderBtnArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
`

export const CheckboxCircle = styled.div<{ isChecked: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${({ isChecked }) => (isChecked ? '#000' : '#ccc')};
  border-radius: 50%;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

export const CheckboxLabel = styled.span<{ isChecked: boolean }>`
  color: ${({ isChecked }) => (isChecked ? '#000' : '#ccc')};
`

export const InputArea = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-height: 700px) {
    margin-bottom: 40px;
    gap: 0.3rem;
  }
`

export const PickerBtn = styled.div<{ hasBreed: boolean }>`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  font-size: ${({ theme }) => theme.typography._20};
  color: ${({ theme, hasBreed }) => (hasBreed ? 'black' : theme.colors.grayscale.font_3)};
  font-weight: ${({ hasBreed }) => (hasBreed ? 'bold' : 'default')};
  cursor: pointer;
`

export const WeightInput = styled.input`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography._20};
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
