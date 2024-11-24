import * as S from './styles'
import { useRef, useState } from 'react'
import { ActionButton } from '~components/Button/ActionButton'
import AddDogPicture from '~assets/add-dog-picture.svg'
import TwoLineInput from '~components/Input/TwoLineInput'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'
import { useModalStore } from '~stores/modalStore'
import DatePickerModal from '~modals/DatePickerModal'

export default function DogProfileSection() {
  const [dogImage, setDogImage] = useState<string | undefined>(undefined)
  const [dogName, setDogName] = useState('')
  const [birth, setBirth] = useState('')
  const [intro, setIntro] = useState('')

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { pushModal } = useModalStore()

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
        <ActionButton>다음</ActionButton>
      </S.DogProfileSection>
    </>
  )
}
