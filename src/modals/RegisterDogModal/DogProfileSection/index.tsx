import { useRef, useState } from 'react'
import * as S from './styles'
import { ActionButton } from '~components/Button/ActionButton'
import AddDogPicture from '~assets/add-dog-picture.svg'
import TwoLineInput from '~components/Input/TwoLineInput'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'
import { DatePicker } from 'ios-style-picker'
import '/node_modules/ios-style-picker/dist/style.css'

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
          <S.NameInput placeholder='이름 입력' />
          <S.DatePickerBtn>생년월일 선택</S.DatePickerBtn>
          <TwoLineInput placeholder='한줄 소개 입력'>한줄 소개 입력</TwoLineInput>
        </S.InputArea>
        <ActionButton>다음</ActionButton>
      </S.DogProfileSection>
      <DatePicker
        fromDate={new Date(2000, 0, 1)}
        toDate={new Date(new Date().getFullYear(), 11, 31)}
        infinite
        initDate={new Date()}
        onChange={(y, m, d) => {
          console.log(y, m, d)
        }}
        formatters={{
          year: value => `${value}년`,
          month: value => `${value}월`,
          day: value => `${value}일`,
        }}
      />
    </>
  )
}
