import styled from 'styled-components'

export const SelectSectionButton = styled.button`
  width: 100%;
  height: 160px;
  padding: 20px 24px;
  border: solid 2px ${({ theme }) => theme.colors.grayscale.gc_1};
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  cursor: pointer;
`

export const TypoWrapper = styled.div`
  text-align: start;
  max-width: 114px;
`

export const Desc = styled.div`
  color: ${({ theme }) => theme.colors.grayscale.font_3};
  color: gray;
  font-size: 13px;
`

export const ImageWrapper = styled.div`
  margin-left: auto;
  margin-top: auto;
`
