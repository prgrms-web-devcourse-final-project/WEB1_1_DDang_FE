import { styled } from 'styled-components'
import { ActionButton } from '~components/Button/ActionButton'
import { Separator } from '~components/Separator'

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-end;
  z-index: 1000;

  animation: fadeIn 0.3s ease-out;

  &.closing {
    animation: fadeOut 0.3s ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`

export const WalkerListContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 40px 40px 0 0;
  padding: 20px;
  z-index: 101;
  height: 80dvh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.6s ease-out;

  &.closing {
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }
`

export const ModalTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 16px;
  text-align: center;
`

export const WalkerListSection = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const WalkerList = styled.div`
  display: flex;
  flex-direction: column;
`

export const WalkerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
`

export const ProfileArea = styled.div`
  display: flex;
  align-items: center;
`

export const ProfileCircle = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #ffe4d6;
  margin-right: 12px;
`

export const InfoArea = styled.div`
  flex: 1;
  color: ${({ theme }) => theme.colors.grayscale.font_2};
  font-size: 14px;
`

export const Name = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 4px;
  color: #111111;
`

export const Details = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
  display: flex;
  align-items: center;
`

export const Detail = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 2px;
`

export const WalkCount = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-weight: 700;
  display: flex;

  p {
    color: ${({ theme }) => theme.colors.brand.default};
  }
`

export const WalkBtn = styled(ActionButton)`
  width: fit-content;
`

export const WalkListSeparator = styled(Separator)`
  margin: 0 4px;
`
