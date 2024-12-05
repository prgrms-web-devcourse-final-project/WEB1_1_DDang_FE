import * as S from './styles'
import { ActionButton } from '~components/Button/ActionButton'
import TwoLineInput from '~components/Input/TwoLineInput'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'
import { useModalStore } from '~stores/modalStore'
import DatePickerModal from '~modals/DatePickerModal'
import DogImageUploader from './DogImageUploader'
import { validateDogProfile } from '~utils/validateDogProfile'
import DogProfileDetailSection from '../DogProfileDetailSection'
import Toast from '~components/Toast'
import { useToastStore } from '~/stores/toastStore'
import { useDogProfileStore } from '~/stores/dogProfileStore'

export default function DogProfileSection() {
  const { popModal, pushModal } = useModalStore()
  const { showToast } = useToastStore()
  const { dogProfile, setDogProfile } = useDogProfileStore()

  const handleDatePickerOpen = () => {
    pushModal(<DatePickerModal date={dogProfile.birthDate} setDate={date => setDogProfile({ birthDate: date })} />)
  }

  const handleNextClick = () => {
    const alertMessage = validateDogProfile(dogProfile)
    if (alertMessage) {
      showToast(alertMessage)
      return
    }
    pushModal(<DogProfileDetailSection />)
  }

  const handlePrevClick = () => {
    setDogProfile({
      name: '',
      image: undefined,
      imageFile: undefined,
      birthDate: null,
      intro: '',
      gender: null,
      isNeutered: false,
      breed: '',
      weight: '',
    })
    popModal()
  }

  return (
    <>
      <S.DogProfileSection>
        <Header type='sm' onClickPrev={handlePrevClick} prevBtn />
        <S.TypoWrapper>
          <Typo24 $weight='700' $textAlign='center'>
            반려견 기본 정보를
            <br /> 알려주세요!
          </Typo24>
        </S.TypoWrapper>
        <DogImageUploader image={dogProfile.image} setImage={update => setDogProfile(update)} />
        <S.InputArea>
          <S.NameInput
            placeholder='이름 입력'
            value={dogProfile.name}
            onChange={e => setDogProfile({ name: e.target.value })}
          />
          <S.DatePickerBtn onClick={handleDatePickerOpen} $hasBirth={!!dogProfile.birthDate}>
            {dogProfile.birthDate
              ? [
                  dogProfile.birthDate.getFullYear(),
                  dogProfile.birthDate.getMonth() + 1,
                  dogProfile.birthDate.getDate(),
                ].join('. ')
              : '생년월일 선택'}
          </S.DatePickerBtn>
          <TwoLineInput
            placeholder='한줄 소개 입력'
            value={dogProfile.intro}
            onChange={e => setDogProfile({ intro: e.target.value })}
          >
            한줄 소개 입력
          </TwoLineInput>
        </S.InputArea>
        <S.ActionButtonArea>
          <ActionButton $bgColor={validateDogProfile(dogProfile) ? 'gc_1' : 'default'} onClick={handleNextClick}>
            다음
          </ActionButton>
          <Toast />
        </S.ActionButtonArea>
      </S.DogProfileSection>
    </>
  )
}
