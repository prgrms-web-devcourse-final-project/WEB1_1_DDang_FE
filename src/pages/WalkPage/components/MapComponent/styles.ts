import { styled } from 'styled-components'
import { FOOTER_HEIGHT } from '~constants/layout'
import DogProfile from '~assets/walk_dog.svg?react'
import MapPin from '~assets/map_pin_1.svg?react'
import MapPin2 from '~assets/map_pin_2.svg?react'
import { ActionButton } from '~components/Button/ActionButton'
import Center from '~assets/center.svg?react'
import { Box } from '~components/Box'

type WalkInfoContainerProps = {
  $isWalking: boolean
}

export const WalkPage = styled.div`
  position: relative;
  width: 100%;
  height: calc(100dvh - ${FOOTER_HEIGHT}px);
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 100;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0));
`

export const BackButton = styled.button`
  border: none;
  padding: 8px;
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  background-color: ${({ theme }) => theme.colors.grayscale.gc_2};
  border-radius: 50%;
  width: 45px;
  height: 45px;
`

export const LocationText = styled.div`
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  font-size: 20px;
  font-weight: 700;
  font-style: bold;
`

export const WalkerListButtonWrapper = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f0f0f0;
`

export const WalkerListIcon = styled(DogProfile)`
  width: 100%;
  height: 100%;
`

export const MapPinIcon = styled(MapPin)`
  width: 100%;
  height: 100%;
`

export const MapPinIcon2 = styled(MapPin2)`
  width: 100%;
  height: 100%;
`

export const WalkControlContainer = styled.div<WalkInfoContainerProps>`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 24px;
  background-color: ${({ $isWalking }: { $isWalking: boolean }) => ($isWalking ? 'white' : 'transparent')};
  padding: 12px 24px;
  border-radius: 100px;
  box-shadow: ${({ $isWalking }: { $isWalking: boolean }) => ($isWalking ? '0px 0px 10px rgba(0, 0, 0, 0.1)' : 'none')};
  min-width: fit-content;
  width: calc(100% - 40px);
`

export const WalkInfoContainer = styled.div<WalkInfoContainerProps>`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 12px 40px;
  border-radius: 100px;
  z-index: 100;
  display: ${({ $isWalking }: { $isWalking: boolean }) => ($isWalking ? 'flex' : 'none')};
  gap: 32px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`

export const InfoBox = styled.div`
  text-align: center;
  min-width: 80px;
`

export const InfoValue = styled.div`
  font-size: 20px;
  font-weight: bold;
`

export const InfoLabel = styled.div`
  font-size: 12px;
  color: #666666;
`

export const WalkButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`

export const StyledActionButton = styled(ActionButton)<{ $isWalking: boolean }>`
  /* padding: 16px 40px; */
  font-size: 17px;
  min-width: 95px;
  max-width: fit-content;
  background-color: ${({ theme, $isWalking }) =>
    $isWalking ? theme.colors.brand.lighten_2 : theme.colors.brand.default};
  color: ${({ theme, $isWalking }) => ($isWalking ? theme.colors.grayscale.font_1 : theme.colors.grayscale.gc_2)};

  &:disabled {
    /* opacity: 0.5; */
    cursor: not-allowed;
    pointer-events: none;
  }
`

export const CenterIcon = styled(Center)`
  width: 14px;
  height: 14px;
`

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
`

export const ModalTitle = styled.h2`
  margin-bottom: 20px;
`

export const ModalSection = styled.div`
  margin-bottom: 15px;
`

export const CoordinatesContainer = styled.div`
  max-height: 200px;
  overflow: auto;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 20px;
`

export const CoordinateItem = styled.div`
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`

export const ModalButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`

export const MapContainer = styled.div`
  height: calc(100dvh - ${FOOTER_HEIGHT}px);
  /* padding: 0 20px; */
`
export const WalkInfoArea = styled(Box)`
  padding: 20px 24px;
`
export const WalkInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  gap: 6px;
  padding: 0 6px;
`
export const WalkTime = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const WalkDistance = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const LocationErrorMessage = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  z-index: 100;
`

export const CenterButton = styled.button`
  position: absolute;
  bottom: 114px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 16px;
  background-color: #000000;
  color: #ffffff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: bold;
  width: 110px;
`

export const Map = styled.div`
  width: 100%;
  height: 100%;
`

export const CompassControlContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
`

export const TransparentWalkControlContainer = styled(WalkControlContainer)`
  background-color: transparent;
  box-shadow: none;
`

export const AccuracyIndicator = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 4px 8px;
  border-radius: 12px;

  color: black;
  font-size: 12px;
  font-weight: 500;
  z-index: 1000;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  gap: 4px;
`

export const AccuracyDot = styled.span<{ $level: 'excellent' | 'good' | 'fair' | 'poor' }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: white;
  display: inline-block;
`
