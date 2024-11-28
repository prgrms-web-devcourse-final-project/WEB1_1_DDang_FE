import styled, { css } from 'styled-components'

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 33px;
`

export const SelectButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.gc_3};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  height: 54px;
`

export const Arrow = styled.span<{ isOpen: boolean }>`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid ${({ theme }) => theme.colors.grayscale.font_2};
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`

export const OptionList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  padding: 0;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.grayscale.gc_1};
  border-radius: 8px;
  list-style: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
`

export const Option = styled.li<{ isSelected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 14px;

  ${({ isSelected, theme }) =>
    isSelected &&
    css`
      background-color: ${theme.colors.brand.lighten_3};
      color: ${theme.colors.brand.default};
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayscale.gc_3};
  }
`
