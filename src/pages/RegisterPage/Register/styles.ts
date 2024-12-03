import { FontWeight, styled } from 'styled-components'

export const RegisterPage = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5.5rem 1.25rem 1.8rem 1.25rem;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};

  @media (max-height: 700px) {
    padding: 4.75rem 1.25rem 1rem;
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
  margin: 1rem 0;
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
export const Avatar = styled.div`
  width: 190px;
  height: 190px;
  border-radius: 50%;
  margin-top: 0.7rem;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.brand.darken};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-height: 700px) {
    width: 150px;
    height: 150px;
  }
`

export const OwnerProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  padding-bottom: 2rem;
  @media (max-height: 700px) {
    gap: 0.5rem;
  }
`

export const NickNameWrapper = styled.div`
  width: 100%;
`

export const PositionChoiceBtn = styled.div<{ $hasSelected?: boolean }>`
  width: 100%;
  border: none;
  text-align: center;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: ${({ theme }) => theme.typography._20};
  color: ${({ theme, $hasSelected }) => ($hasSelected ? theme.colors.grayscale.font_1 : theme.colors.grayscale.font_3)};
  cursor: pointer;

  @media (max-height: 700px) {
    padding: 0.75rem 1.5rem;
  }
`

export const LocationBtn = styled.div<{ $hasSelected?: boolean }>`
  width: 100%;
  border: none;
  text-align: center;
  padding: 1.063rem 2rem;
  border-radius: 0.75rem;
  font-size: ${({ theme }) => theme.typography._20};
  color: ${({ theme, $hasSelected }) => ($hasSelected ? theme.colors.grayscale.font_1 : theme.colors.grayscale.font_3)};
  cursor: pointer;

  @media (max-height: 700px) {
    padding: 0.75rem 1.5rem;
  }
`

export const GenderSelectBtnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  height: 4rem;
  width: 90%;
  margin: 1rem auto;
  & > * {
    height: 100%;
  }

  button {
    flex-direction: row;
    gap: 0.8rem;
    height: 100%;
  }

  @media (max-height: 700px) {
    height: 3.25rem;
  }
`

export const ToastWrapper = styled.div`
  position: relative;
`
