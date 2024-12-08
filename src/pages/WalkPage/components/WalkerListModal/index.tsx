import { NearbyWalker } from '~pages/WalkPage/components/MapComponent'
import * as S from './styles'

type WalkerListModalProps = {
  isOpen: boolean
  onClose: () => void
  isClosing: boolean
  walkers: NearbyWalker[]
  onWalkRequest: (walker: NearbyWalker) => void
}

export default function WalkerListModal({ isOpen, onClose, isClosing, walkers, onWalkRequest }: WalkerListModalProps) {
  if (!isOpen) return null

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <S.Overlay className={isClosing ? 'closing' : ''} onClick={handleBackgroundClick}>
      <S.WalkerListContainer className={isClosing ? 'closing' : ''}>
        <S.ModalTitle>강번따 리스트</S.ModalTitle>
        <S.WalkerListSection>
          {walkers.length > 0 ? (
            <S.WalkerList>
              {walkers.map(walker => (
                <S.WalkerItem key={walker.dogId}>
                  <S.ProfileArea>
                    <S.ProfileCircle>
                      <img src={walker.dogProfileImg} alt={walker.dogName} />
                    </S.ProfileCircle>
                    <S.InfoArea>
                      <S.Name>{walker.dogName}</S.Name>
                      <S.Details>
                        <S.Detail>{walker.breed}</S.Detail>
                        <S.WalkListSeparator $height={8} />
                        <S.Detail>{walker.dogAge}살</S.Detail>
                        <S.WalkListSeparator $height={8} />
                        <S.Detail>{walker.dogGender === 'MALE' ? '남' : '여'}</S.Detail>
                      </S.Details>
                      <S.WalkCount>
                        산책 횟수 <p>&nbsp;{walker.dogWalkCount}회</p>
                      </S.WalkCount>
                    </S.InfoArea>
                  </S.ProfileArea>
                  <S.WalkBtn
                    $type='roundedRect'
                    $bgColor='lighten_3'
                    $fontWeight='700'
                    onClick={() => onWalkRequest(walker)}
                  >
                    강번따
                  </S.WalkBtn>
                </S.WalkerItem>
              ))}
            </S.WalkerList>
          ) : (
            <S.NoWalkersMessage>주변에 산책 가능한 유저가 없습니다.</S.NoWalkersMessage>
          )}
        </S.WalkerListSection>
      </S.WalkerListContainer>
    </S.Overlay>
  )
}
