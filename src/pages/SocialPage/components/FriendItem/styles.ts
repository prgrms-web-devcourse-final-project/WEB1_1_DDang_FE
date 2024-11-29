import { styled } from 'styled-components'

export const FriendItem = styled.div`
  position: relative;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayscale.gc_2};
`

export const TypoWrapper = styled.div``
export const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`
export const MessageBtn = styled.button`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.brand.lighten_3};
  padding: 9.5px 16px;
  right: 20px;
  border-radius: 12px;
`
