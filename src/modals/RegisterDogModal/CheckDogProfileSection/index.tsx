import * as S from './styles'
import { ActionButton } from '~components/Button/ActionButton'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'
import Profile from '~components/Profile'
import Tag from '~components/Tag'
import { useModalStore } from '~stores/modalStore'
import { DogProfileType } from '~types/dogProfile'
import { useJoinFamily } from '~apis/family/useFamily'
import { calculateAge } from '~utils/calculateAge'

interface CheckDogProfileSectionProp {
  familyCode: string
  dogProfiles: DogProfileType[]
}

export default function CheckDogProfileSection({ familyCode, dogProfiles }: CheckDogProfileSectionProp) {
  const joinFamilyMutation = useJoinFamily()
  const { popModal } = useModalStore()
  const dogProfile = dogProfiles[0]

  const handleOnClick = () => {
    console.log(familyCode)
    joinFamilyMutation.mutate(familyCode)
  }

  return (
    <>
      <S.CheckDogProfileSection>
        <Header type='sm' onClickPrev={popModal} prevBtn />
        <S.ProfileArea>
          <S.TypoWrapper>
            <Typo24 $weight='700' $textAlign='center'>
              이 반려견이
              <br />
              맞나요?
            </Typo24>
          </S.TypoWrapper>
          <S.ProfileWrapper>
            {/* 온라인 이미지여서 최적화 관련 uses-rel-preconnect 에러가 발생합니다! 일단 lighthouserc에서 warning으로 바꾸어 놓았습니다. 
            차후 실제 이미지로 바꾸게 되면 관련 설정을 'uses-rel-preconnect': 'warn' 부분을 제거해서 에러를 활성화해주시고
             index.html 파일에서 <link rel="preconnect" href="https://fastly.jsdelivr.net" crossorigin />과 같이 
             url을 추가해주세요.
             */}
            <Profile $size={180} $src={dogProfile.profileImg} />
            <S.TagWrapper>
              <Tag content={dogProfile.name} />
              <Tag content={dogProfile.breed} />
              <Tag content={calculateAge(dogProfile.birthDate).toString()} />
            </S.TagWrapper>
          </S.ProfileWrapper>
        </S.ProfileArea>
        <ActionButton onClick={handleOnClick}>다음</ActionButton>
      </S.CheckDogProfileSection>
    </>
  )
}
