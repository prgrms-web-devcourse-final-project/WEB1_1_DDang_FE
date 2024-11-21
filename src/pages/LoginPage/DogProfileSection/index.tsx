import * as S from './styles'
import { ActionButton } from '../../../components/Button/ActionButton'
import AddDogPicture from '../../../assets/add-dog-picture.svg'
import TwoLineInput  from '../../../components/Input/TwoLineInput'
import PrevButton from '../../../components/Button/PrevButton'
import { Typo24 } from './../../../components/Typo/index';

export default function DogProfileSection() {
  return (
          <S.DogProfileSection>
            <S.PrevBtnWrapper>
              <PrevButton />
            </S.PrevBtnWrapper>
            <S.TypoWrapper>
            <Typo24 weight='700'>반려견 기본 정보를<br/> 알려주세요!</Typo24>
            </S.TypoWrapper>
            <S.AddDogPictureBtnWrapper>
              <S.AddDogPictureBtn>
                <img src={AddDogPicture} alt="반려견 사진 추가" />
                <div>반려견 사진 추가</div>
              </S.AddDogPictureBtn>
            </S.AddDogPictureBtnWrapper>
            <S.InputArea>
              <TwoLineInput placeholder='이름 입력'>이름 입력</TwoLineInput>
              <S.DatePickerBtn>생년월일 선택</S.DatePickerBtn>
              <TwoLineInput placeholder='한줄 소개 입력'>한줄 소개 입력</TwoLineInput>
            </S.InputArea>
            <ActionButton>다음</ActionButton>
          </S.DogProfileSection>
  )
}
