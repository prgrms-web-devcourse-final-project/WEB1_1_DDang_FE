import { FontWeight, styled } from 'styled-components'

export const Register = styled.div`
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100dvh;

  padding: 50px 20px;
  position: relative;

  border: 2px solid red;
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
