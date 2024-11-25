import * as S from './styles'
import { useState } from 'react'
import { ActionButton } from '~components/Button/ActionButton'
import GenderSelectButton from '~components/GenderSelectButton'
import { Typo24 } from '~components/Typo/index'
import Check from '~assets/check.svg'
import Header from '~components/Header/index'

export default function DogProfileDetailSection() {
  const [isNeutered, setIsNeutered] = useState(false)
  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null)
  const [weight, setWeight] = useState('')

  const [displayValue, setDisplayValue] = useState('')
  const [inputType, setInputType] = useState('text')

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setSelectedGender(gender)
  }

  const onChangeWeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setWeight('')
      setDisplayValue('')
      return
    }

    if (/^\d*\.?\d*$/.test(value)) {
      const formatted = value.includes('.') ? value.match(/^\d*\.?\d{0,2}/)![0] : value

      setWeight(formatted)
      setDisplayValue(inputType === 'number' ? formatted : `${formatted}kg`)
    }
  }

  const handleFocus = () => {
    setInputType('number')
    setDisplayValue(weight)
  }

  const handleBlur = () => {
    setInputType('text')
    if (weight) {
      setDisplayValue(`${weight}kg`)
    }
  }

  const handleClickPrev = () => {}

  return (
    <>
      <Header type='sm' onClickPrev={handleClickPrev} prevBtn />
      <S.DogProfileDetailSection>
        <S.TypoWrapper>
          <Typo24 weight='700'>
            반려견 상세 정보를
            <br /> 알려주세요!
          </Typo24>
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
          <S.CheckboxWrapper onClick={() => setIsNeutered(!isNeutered)}>
            <S.CheckboxCircle isChecked={isNeutered}>
              {isNeutered && <img src={Check} alt='check'></img>}
            </S.CheckboxCircle>
            <S.CheckboxLabel isChecked={isNeutered}>중성화 했어요</S.CheckboxLabel>
          </S.CheckboxWrapper>
        </S.GenderBtnArea>
        <S.InputArea>
          <S.PickerBtn>견종 입력</S.PickerBtn>
          <S.WeightInput
            placeholder='몸무게 입력'
            type={inputType}
            value={displayValue}
            onChange={onChangeWeightInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </S.InputArea>
        <ActionButton>확인</ActionButton>
      </S.DogProfileDetailSection>
    </>
  )
}
