import { IoChevronBack } from 'react-icons/io5'
import MapComponent, { NearbyWalker } from './components/MapComponent'
import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import WalkerListModal from '~pages/WalkPage/components/WalkerListModal'

export default function WalkPage() {
  const navigate = useNavigate()
  // const [_modalType, _setModalType] = useState<'request' | 'accept' | 'complete' | 'progress' | 'friend' | null>(null)
  // const [isModalOpen, _setIsModalOpen] = useState(false)
  const [isModalOpen] = useState(false)
  const [isWalkerListOpen, setIsWalkerListOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const [nearbyWalkers, setNearbyWalkers] = useState<NearbyWalker[]>([])

  const handleWalkerListClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      setIsWalkerListOpen(false)
    }, 300)
  }

  return (
    <S.WalkPage>
      <Helmet>
        <title>DDang | 산책하기</title>
        <meta name='description' content='반려견과 함께 산책을 시작해보세요.' />
      </Helmet>

      <S.Header>
        <S.BackButton onClick={() => navigate(-1)}>
          <IoChevronBack size={24} />
        </S.BackButton>
        <S.LocationText>강남구 논현동</S.LocationText>
        <S.WalkerListButtonWrapper>
          <S.WalkerListIcon onClick={() => setIsWalkerListOpen(true)} />
        </S.WalkerListButtonWrapper>
      </S.Header>

      <MapComponent isModalOpen={isModalOpen} setNearbyWalkers={setNearbyWalkers} />
      <WalkerListModal
        isOpen={isWalkerListOpen}
        onClose={handleWalkerListClose}
        isClosing={isClosing}
        walkers={nearbyWalkers}
      />
    </S.WalkPage>
  )
}
