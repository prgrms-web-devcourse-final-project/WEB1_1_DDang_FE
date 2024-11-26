import * as S from './styles'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import { Typo24 } from '~components/Typo/index'
import SelectSectionButton from './SelectSectionButton'
import addDogProfile from '~assets/add-dog-profile.svg'
import addFamilycode from '~assets/add-family-code.svg'
import DogProfileSection from '~modals/RegisterDogModal/DogProfileSection'
import FamilyCodeSection from '~modals/RegisterDogModal/FamilyCodeSection'
import { useModalStore } from '~stores/modalStore'
export interface DogProfileType {
  name: string
  image: string | undefined
  birth: string
  intro: string
  gender: 'male' | 'female' | null
  isNeutered: boolean
  breed: string
  weight: string
}

export default function RegisterDogPage() {
  const { pushModal } = useModalStore()
  const [dogProfile, setDogProfile] = useState<DogProfileType>({
    name: '',
    image: undefined,
    birth: '',
    intro: '',
    gender: null,
    isNeutered: false,
    breed: '',
    weight: '',
  })

  useEffect(() => {
    console.log(dogProfile)
  }, [dogProfile])

  const handleDogProfileClick = () => {
    pushModal(<DogProfileSection dogProfile={dogProfile} setDogProfile={setDogProfile} />)
  }

  const handleFamilyCodeClick = () => {
    pushModal(<FamilyCodeSection />)
  }
  return (
    <S.RegisterDogPage>
      <Helmet>
        <title>DDang | 반려견 정보 등록</title>
        <meta name='description' content='반려견의 정보를 등록하세요.' />
      </Helmet>
      <S.TypoWrapper>
        <Typo24 weight='700'>
          키우는 반려견을 등록하고
          <br /> 즐거운 산책을 시작하세요!
        </Typo24>
      </S.TypoWrapper>
      <S.ButtonWrapper>
        <SelectSectionButton
          title='반려견 프로필 추가하기'
          description='반려견 프로필을 추가해보세요'
          src={addDogProfile}
          onClick={handleDogProfileClick}
        />
        <SelectSectionButton
          title='가족 반려견 등록하기'
          description='가족 코드를 등록해보세요'
          src={addFamilycode}
          onClick={handleFamilyCodeClick}
        />
      </S.ButtonWrapper>
    </S.RegisterDogPage>
  )
}
