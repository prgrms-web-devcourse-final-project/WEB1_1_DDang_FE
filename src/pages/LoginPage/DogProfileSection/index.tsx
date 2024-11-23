import { useRef, useState } from 'react'
import * as S from './styles'
import { ActionButton } from '~components/Button/ActionButton'
import AddDogPicture from '~assets/add-dog-picture.svg'
import TwoLineInput from '~components/Input/TwoLineInput'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'

export default function DogProfileSection() {
  const [dogImage, setDogImage] = useState<string | undefined>(undefined)

  const fileInputRef = useRef<HTMLInputElement>(null)

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

  return (
    <>
      <Header type='sm' onClickPrev={handleClickPrev} prevBtn={true} />
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
          <S.NameInput placeholder='이름 입력' />
          <S.DatePickerBtn>생년월일 선택</S.DatePickerBtn>
          <TwoLineInput placeholder='한줄 소개 입력'>한줄 소개 입력</TwoLineInput>
        </S.InputArea>
        <ActionButton>다음</ActionButton>
      </S.DogProfileSection>
    </>
  )
}
