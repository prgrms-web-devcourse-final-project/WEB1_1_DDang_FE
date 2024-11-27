import * as S from './styles'

interface WalkerListModalProps {
  isOpen: boolean
  onClose: () => void
  isClosing: boolean
}

export default function WalkerListModal({ isOpen, onClose, isClosing }: WalkerListModalProps) {
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
          <S.WalkerList>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <S.WalkerItem key={i}>
                  <S.ProfileArea>
                    <S.ProfileCircle />
                    <S.InfoArea>
                      <S.Name>밤돌이</S.Name>
                      <S.Details>
                        <S.Detail>포메라니안</S.Detail>
                        <S.WalkListSeparator $height={8} />
                        <S.Detail>4살</S.Detail>
                        <S.WalkListSeparator $height={8} />
                        <S.Detail>남</S.Detail>
                      </S.Details>
                      <S.WalkCount>
                        산책 횟수 <p>&nbsp;4회</p>
                      </S.WalkCount>
                    </S.InfoArea>
                  </S.ProfileArea>
                  <S.WalkBtn $type='roundedRect' $bgColor='lighten_3' $fontWeight='700'>
                    강번따
                  </S.WalkBtn>
                </S.WalkerItem>
              ))}
          </S.WalkerList>
        </S.WalkerListSection>
      </S.WalkerListContainer>
    </S.Overlay>
  )
}
