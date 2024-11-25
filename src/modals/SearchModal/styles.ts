import styled from 'styled-components'

export const SearchModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: yellow;
`

export const SearchArea = styled.div`
  position: relative;
  border: solid 1px red;
  height: 47%;
  margin: 80px 20px;

  &::before {
    content: '견종';
    position: absolute;
    top: -26px;
    left: 2px;
    width: auto;
    height: 30px;
  }
`

export const SearchInput = styled.input`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
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
