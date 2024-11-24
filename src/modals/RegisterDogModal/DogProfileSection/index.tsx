import * as S from './styles'
import { useState } from 'react'
import { ActionButton } from '~components/Button/ActionButton'
import TwoLineInput from '~components/Input/TwoLineInput'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'
import { useModalStore } from '~stores/modalStore'
import DatePickerModal from '~modals/DatePickerModal'
import AlertForm from '~components/AlertForm'
import DogImageUploader from './DogImageUploader'
import { validateDogProfile } from '~utils/validateDogProfile'

interface DogProfileType {
  name: string
  image: string | undefined
  birth: string
  intro: string
}

export default function DogProfileSection() {
  const [dogProfile, setDogProfile] = useState<DogProfileType>({
    name: '',
    image: undefined,
    birth: '',
    intro: '',
  })

  const { pushModal } = useModalStore()
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState('')

  const handleClickPrev = () => {}

  const handleDatePickerOpen = () => {
    pushModal(
      <DatePickerModal date={dogProfile.birth} setDate={date => setDogProfile(prev => ({ ...prev, birth: date }))} />
    )
  }

  const handleNextClick = () => {
    const alertMessage = validateDogProfile(dogProfile)
    if (alertMessage) {
      triggerAlert(alertMessage)
      return
    }
    console.log('다음 페이지로')
  }

  const triggerAlert = (message: string) => {
    setAlertContent(message)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
    }, 2000)
  }

  return (
    <>
      <Header type='sm' onClickPrev={handleClickPrev} prevBtn />
      <S.DogProfileSection>
        <S.TypoWrapper>
          <Typo24 weight='700'>
            반려견 기본 정보를
            <br /> 알려주세요!
          </Typo24>
        </S.TypoWrapper>
        <DogImageUploader image={dogProfile.image} setImage={image => setDogProfile(prev => ({ ...prev, image }))} />
        <S.InputArea>
          <S.NameInput
            placeholder='이름 입력'
            value={dogProfile.name}
            onChange={e => setDogProfile(prev => ({ ...prev, name: e.target.value }))}
          />
          <S.DatePickerBtn onClick={handleDatePickerOpen} hasBirth={!!dogProfile.birth}>
            {dogProfile.birth || '생년월일 선택'}
          </S.DatePickerBtn>
          <TwoLineInput
            placeholder='한줄 소개 입력'
            value={dogProfile.intro}
            onChange={e => setDogProfile(prev => ({ ...prev, intro: e.target.value }))}
          >
            한줄 소개 입력
          </TwoLineInput>
        </S.InputArea>
        <S.ActionButtonArea>
          <ActionButton onClick={handleNextClick}>다음</ActionButton>
          <S.AlertFormWrapper isVisible={showAlert}>
            <AlertForm content={alertContent} />
          </S.AlertFormWrapper>
        </S.ActionButtonArea>
      </S.DogProfileSection>
    </>
  )
}
