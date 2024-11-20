import { styled } from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

export const TwoLineInput = styled(TextareaAutosize)`
  width: 100%;
  border: none;
  text-align: center;
  padding: 17px 32px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.typography.suitVariable20pt};
  resize: none; // 수동 리사이즈 방지
  overflow: hidden; // 스크롤바 제거
  &:focus {
    box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.colors.grayscale.font_1}`};
  }
`
