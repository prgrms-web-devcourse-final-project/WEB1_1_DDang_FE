import { FontWeight, styled } from 'styled-components'

export const Register = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100dvh;
  padding: 20px 20px;
  position: relative;
  border: 2px solid red;

  @media (max-height: 700px) {
    padding: 100px 20px 24px 20px;
  }
`

export const TextSection = styled.text<{ weight: FontWeight }>`
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._24};
  font-weight: ${({ weight }) => weight};
  white-space: pre-line;
  text-align: center;
  margin-top: 20%;
  margin-bottom: 30px;
`
export const AddOwnerAvatarBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`
export const AddOwnerAvatarBtn = styled.div`
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
export const OwnerProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const NickNameWrapper = styled.div`
  text-align: center;
`

export const PositionChoiceBtn = styled.div`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography._20};
  color: ${({ theme }) => theme.colors.grayscale.font_3};
  cursor: pointer;
`
export const LocationBtn = styled.div`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography._20};
  color: ${({ theme }) => theme.colors.grayscale.font_3};
  cursor: pointer;
`
export const GenderSelectBtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  height: 62px;
  border: 1px solid red;
  & > * {
    height: 100%; // 부모 높이에 맞춥니다
  }
  button {
    flex-direction: row;
    gap: 0.8rem;
    height: 100%;
  }
`
