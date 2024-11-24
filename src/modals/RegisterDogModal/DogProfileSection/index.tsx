import * as S from './styles'
import { useRef, useState } from 'react'
import { ActionButton } from '~components/Button/ActionButton'
import AddDogPicture from '~assets/add-dog-picture.svg'
import TwoLineInput from '~components/Input/TwoLineInput'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'
import { useModalStore } from '~stores/modalStore'
import DatePickerModal from '~modals/DatePickerModal'
import AlertForm from '~components/AlertForm'

export default function DogProfileSection() {
  const [dogName, setDogName] = useState('')
  const [dogImage, setDogImage] = useState<string | undefined>(undefined)
  const [birth, setBirth] = useState('')
  const [intro, setIntro] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { pushModal } = useModalStore()
  const [showAlert, setShowAlert] = useState(false)
  const [alertContent, setAlertContent] = useState('')

  const handleClickPrev = () => {}

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDogImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePictureAddBtn = () => {
    fileInputRef.current?.click()
  }

  const handleDatePickerOpen = () => {
    pushModal(<DatePickerModal date={birth} setDate={setBirth} />)
  }

  const handleNextClick = () => {
    if (!dogName) {
      setAlertContent('반려견 이름을 입력해주세요')
      setShowAlert(true)
    } else if (!dogImage) {
      setAlertContent('반려견 사진을 등록해주세요')
      setShowAlert(true)
    } else if (!birth) {
      setAlertContent('반려견 생일을 입력해주세요')
      setShowAlert(true)
    } else if (!intro) {
      setAlertContent('한줄 소개를 적어주세요')
      setShowAlert(true)
    } else {
      console.log('다음 페이지로')
      return
    }

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
        <S.AddDogPictureBtnWrapper>
          <S.AddDogPictureBtn onClick={handlePictureAddBtn}>
            <img src={AddDogPicture} alt='반려견 사진 추가' />
            <div>반려견 사진 추가</div>
            <S.HiddenFileInput type='file' ref={fileInputRef} onChange={handleImageChange} />
            <S.DogImage src={dogImage} alt='반려견 사진' hasImage={!!dogImage} />
          </S.AddDogPictureBtn>
        </S.AddDogPictureBtnWrapper>
        <S.InputArea>
          <S.NameInput placeholder='이름 입력' value={dogName} onChange={e => setDogName(e.target.value)} />
          <S.DatePickerBtn onClick={handleDatePickerOpen} hasBirth={!!birth}>
            {birth || '생년월일 선택'}
          </S.DatePickerBtn>
          <TwoLineInput placeholder='한줄 소개 입력' value={intro} onChange={e => setIntro(e.target.value)}>
            한줄 소개 입력
          </TwoLineInput>
        </S.InputArea>
        <S.ActionButtonArea>
          <ActionButton onClick={handleNextClick}>다음</ActionButton>
          <S.AlertFormWrapper isVisible={showAlert}>
            <AlertForm content={alertContent}></AlertForm>
          </S.AlertFormWrapper>
        </S.ActionButtonArea>
      </S.DogProfileSection>
    </>
  )
}
