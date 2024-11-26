import styled from 'styled-components'

export const SearchModalOverlay = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding-top: 140px;

  @media (max-height: 750px) {
    padding-top: 120px;
  }

  @media (max-height: 700px) {
    padding-top: 100px;
  }
`

export const SearchArea = styled.div`
  position: relative;
  height: 45%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
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

export const SearchResultsWrapper = styled.div`
  border-radius: 12px;
  background-color: white;
  flex: 1;
  overflow-y: auto;
  padding: 4px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.grayscale.gc_2};
    border-radius: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.grayscale.font_1};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export const SearchResult = styled.div`
  border-radius: 12px;
  /* font-size: 15px; */
  height: 55px;
  padding: 16px 20px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.brand.lighten_3};
  }
`
export const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.brand.darken};
  font-weight: bold;
`
