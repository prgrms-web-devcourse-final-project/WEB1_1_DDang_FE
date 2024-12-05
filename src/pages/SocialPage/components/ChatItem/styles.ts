import { styled } from 'styled-components'

export const ChatItem = styled.div`
  position: relative;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  cursor: pointer;
`
export const TypoWrapper = styled.div``
export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`
export const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`

export const UnreadChatCount = styled.span`
  position: absolute;
  right: 20px;
  display: block;
  border-radius: 22px;
  background-color: ${({ theme }) => theme.colors.brand.sub};
  min-width: 20px;

  padding: 1.5px 6px;
  color: ${({ theme }) => theme.colors.grayscale.gc_4};

  display: flex;
  justify-content: center;
  align-items: center;
`
