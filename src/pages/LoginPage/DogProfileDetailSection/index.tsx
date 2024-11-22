import * as S from './styles'
import { useEffect, useState } from 'react'
import { ActionButton } from '~components/Button/ActionButton'
import GenderSelectButton from '../components/GenderSelectButton'
import PrevButton from '~components/Button/PrevButton'
import { Typo24 } from '~components/Typo/index'
import Check from '~assets/check.svg'

export default function DogProfileDetailSection() {
  const [isNeutered, setIsNeutered] = useState(false);
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);

  useEffect(() => {
    console.log(selectedGender)
  }, [selectedGender])
 
  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender);
  };

  const onChangeWeightInput = () => {
    
  }

  return (
          <S.DogProfileDetailSection>
            <S.PrevBtnWrapper>
              <PrevButton />
            </S.PrevBtnWrapper>
            <S.TypoWrapper>
            <Typo24 weight='700'>반려견 상세 정보를<br/> 알려주세요!</Typo24>
            </S.TypoWrapper>
            <S.GenderBtnArea>
              <S.GenderSelectBtnWrapper>
              <GenderSelectButton 
                  gender='male' 
                  isActive={selectedGender === 'male'}
                  onClick={() => handleGenderSelect('male')}
                />
                <GenderSelectButton 
                  gender='female' 
                  isActive={selectedGender === 'female'}
                  onClick={() => handleGenderSelect('female')}
                />
              </S.GenderSelectBtnWrapper>
              <S.CheckboxWrapper  onClick={() => setIsNeutered(!isNeutered)}>
                <S.CheckboxCircle isChecked={isNeutered}>
                  {isNeutered && <img src={Check} alt='check'></img>}
                </S.CheckboxCircle>
                <S.CheckboxLabel isChecked = {isNeutered}>중성화 했어요</S.CheckboxLabel>
              </S.CheckboxWrapper>
            </S.GenderBtnArea>
            <S.InputArea>
              <S.PickerBtn>견종 입력</S.PickerBtn>
              <S.WeightInput placeholder='몸무게 입력' onChange={onChangeWeightInput}/>
            </S.InputArea>
            <ActionButton>확인</ActionButton>
          </S.DogProfileDetailSection>
  )
}
