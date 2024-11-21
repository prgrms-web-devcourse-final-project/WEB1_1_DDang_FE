import { styled } from 'styled-components'

export const Toggle = styled.div`
  display: block;
  width: fit-content;
  border-radius: 100px;
  position: relative;
  overflow: hidden;
  width: 40px;
  height: 24px;

  & > label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.grayscale.gc_1};
    transition: background-color 0.3s;
  }
  & > input:checked + label {
    background-color: ${({ theme }) => theme.colors.grayscale.font_1};
  }
`

export const Circle = styled.div`
  position: absolute;
  top: 50%;
  left: 2px;
  translate: 0 -50%;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  input:checked + label > & {
    translate: 16px -50%;
  }
  transition: translate 0.3s;
`
