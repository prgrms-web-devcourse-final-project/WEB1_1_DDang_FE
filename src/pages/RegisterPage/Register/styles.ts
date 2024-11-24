import { FontWeight, styled } from 'styled-components'

export const Register = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 120px 20px 24px 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};

  @media (max-height: 700px) {
    padding: 76px 20px 16px;
    gap: 0.5rem;
  }
`

export const TextSection = styled.text<{ weight: FontWeight }>`
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: ${({ theme }) => theme.typography._24};
  font-weight: ${({ weight }) => weight};
  white-space: pre-line;
  text-align: center;
`

export const AddOwnerAvatarBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;
`

export const AddOwnerAvatarBtn = styled.div`
  width: 180px;
  height: 180px;
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
  border-radius: 50%;
  margin-top: 0.7rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;

  font-weight: 700;
  color: ${({ theme }) => theme.colors.brand.darken};
  cursor: pointer;

  @media (max-height: 700px) {
    width: 150px;
    height: 150px;
  }
`

export const OwnerProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;

  @media (max-height: 700px) {
    gap: 0.5rem;
  }
`

export const NickNameWrapper = styled.div`
  width: 100%;
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

  @media (max-height: 700px) {
    padding: 12px 24px;
  }
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

  @media (max-height: 700px) {
    padding: 12px 24px;
  }
`

export const GenderSelectBtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  height: 62px;

  & > * {
    height: 100%;
  }

  button {
    flex-direction: row;
    gap: 0.8rem;
    height: 100%;
  }

  @media (max-height: 700px) {
    height: 52px;
  }
`
