import { styled } from 'styled-components'

export const SendMessageForm = styled.form`
  padding: 20.5px 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 64px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1000;
`
export const ChatInput = styled.input`
  flex: 1;
  border: none;
  font-weight: 500;
`
export const SendBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.brand.lighten_2};
  padding: 9.5px 16px;
  border-radius: 32px;
`
