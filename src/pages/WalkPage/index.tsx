import { IoChevronBack } from 'react-icons/io5'
import MapComponent, { NearbyWalker } from './components/MapComponent'
import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import WalkerListModal from '~pages/WalkPage/components/WalkerListModal'
import WalkModal from '~pages/WalkPage/components/WalkModal'

const dummyWalkers: NearbyWalker[] = [
  {
    dogId: 1,
    dogName: '멍멍이',
    dogProfileImg: 'https://placedog.net/200/200?id=1',
    breed: '골든리트리버',
    dogAge: 3,
    dogGender: 'MALE',
    dogWalkCount: 15,
    memberId: 1,
    memberEmail: 'test@test.com',
  },
  {
    dogId: 2,
    dogName: '초코',
    dogProfileImg: 'https://placedog.net/200/200?id=2',
    breed: '푸들',
    dogAge: 2,
    dogGender: 'FEMALE',
    dogWalkCount: 8,
    memberId: 2,
    memberEmail: 'test2@test.com',
  },
  {
    dogId: 3,
    dogName: '바둑이',
    dogProfileImg: 'https://placedog.net/200/200?id=3',
    breed: '말티즈',
    dogAge: 4,
    dogGender: 'MALE',
    dogWalkCount: 20,
    memberId: 3,
    memberEmail: 'test3@test.com',
  },
  {
    dogId: 4,
    dogName: '뽀삐',
    dogProfileImg: 'https://placedog.net/200/200?id=4',
    breed: '포메라니안',
    dogAge: 1,
    dogGender: 'FEMALE',
    dogWalkCount: 5,
    memberId: 4,
    memberEmail: 'test4@test.com',
  },
  {
    dogId: 5,
    dogName: '보리',
    dogProfileImg: 'https://placedog.net/200/200?id=5',
    breed: '포메라니안',
    dogAge: 1,
    dogGender: 'FEMALE',
    dogWalkCount: 5,
    memberId: 5,
    memberEmail: 'test5@test.com',
  },
]

export default function WalkPage() {
  const navigate = useNavigate()
  const [isModalOpen] = useState(false)
  const [isWalkerListOpen, setIsWalkerListOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const [nearbyWalkers, setNearbyWalkers] = useState<NearbyWalker[]>([])

  const [isWalkModalOpen, setIsWalkModalOpen] = useState(false)
  const [selectedWalker, setSelectedWalker] = useState<NearbyWalker | null>(null)

  const handleWalkRequest = (walker: NearbyWalker) => {
    setSelectedWalker(walker)
    setIsWalkModalOpen(true)
  }

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
        walkers={dummyWalkers}
        onWalkRequest={handleWalkRequest}
      />

      {isWalkModalOpen && selectedWalker && (
        <WalkModal
          type='request'
          userInfo={{
            name: selectedWalker.dogName,
            breed: selectedWalker.breed,
            age: selectedWalker.dogAge,
            gender: selectedWalker.dogGender === 'MALE' ? '남' : '여',
            profileImg: selectedWalker.dogProfileImg,
          }}
          onClose={() => setIsWalkModalOpen(false)}
          onConfirm={() => {
            // 산책 요청 처리 로직
            setIsWalkModalOpen(false)
          }}
        />
      )}
    </S.WalkPage>
  )
}
