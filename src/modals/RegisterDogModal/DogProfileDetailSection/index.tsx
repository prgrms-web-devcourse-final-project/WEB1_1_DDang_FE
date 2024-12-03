import * as S from './styles'
import { useState } from 'react'
import { ActionButton } from '~components/Button/ActionButton'
import GenderSelectButton from '~components/GenderSelectButton'
import { Typo24 } from '~components/Typo/index'
import Check from '~assets/is-neutered-check.svg'
import Header from '~components/Header/index'
import SearchModal from '~modals/SearchModal'
import { useModalStore } from '~stores/modalStore'
import { useDogProfileStore } from '~/stores/dogProfileStore'
import { validateDogDetailProfile } from '~utils/validateDogProfile'
import { useToastStore } from '~stores/toastStore'
import Toast from '~components/Toast'
import { createDogProfile, CreateDogProfileRequest } from '~apis/dog/createDogProfile'

export default function DogProfileDetailSection() {
  const { dogProfile, setDogProfile } = useDogProfileStore()
  const { pushModal, popModal } = useModalStore()
  const { showToast } = useToastStore()

  const [displayValue, setDisplayValue] = useState('')
  const [inputType, setInputType] = useState('text')

  const handleGenderSelect = (gender: 'male' | 'female') => {
    setDogProfile({ gender })
  }

  const onChangeWeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setDogProfile({ weight: '' })
      setDisplayValue('')
      return
    }

    if (/^\d*\.?\d*$/.test(value)) {
      const formatted = value.includes('.') ? value.match(/^\d*\.?\d{0,2}/)![0] : value

      setDogProfile({ weight: formatted })
      setDisplayValue(inputType === 'number' ? formatted : `${formatted}kg`)
    }
  }

  const handleFocus = () => {
    setInputType('number')
    setDisplayValue(dogProfile.weight)
  }

  const handleBlur = () => {
    setInputType('text')
    if (dogProfile.weight) {
      setDisplayValue(`${dogProfile.weight}kg`)
    }
  }

  const handleComfirmClick = async () => {
    const alertMessage = validateDogDetailProfile(dogProfile)
    if (alertMessage) {
      showToast(alertMessage)
      return
    }
    try {
      const createDogProfileRequest: CreateDogProfileRequest = {
        name: dogProfile.name,
        breed: dogProfile.breed,
        birthDate: dogProfile.birth as Date,
        weight: parseFloat(dogProfile.weight),
        gender: dogProfile.gender?.toUpperCase() as 'MALE' | 'FEMALE',
        profileImg:
          'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR_LukTVYQBmhxXr02u71BR60FmFj07wR0GH7ryW5kCHLWef4BznpT7CfjR5Uyukevf30ivmnrohj9tBcjmSZUiqw',
        isNeutered: dogProfile.isNeutered ? 'TRUE' : 'FALSE',
        familyId: null,
        comment: dogProfile.intro,
      }

      const response = await createDogProfile(createDogProfileRequest)

      if (response.code === 200) {
        // 이제 홈으로 이동
        showToast('반려견 등록이 완료되었습니다')
      }
    } catch (error) {
      if (error instanceof Error) {
        showToast(error.message)
      } else showToast('반려견 등록이 실패했습니다.')
    }
  }

  return (
    <>
      <S.DogProfileDetailSection>
        <Header type='sm' onClickPrev={popModal} prevBtn />
        <S.TypoWrapper>
          <Typo24 $weight='700' $textAlign='center'>
            반려견 상세 정보를
            <br /> 알려주세요!
          </Typo24>
        </S.TypoWrapper>
        <S.GenderBtnArea>
          <S.GenderSelectBtnWrapper>
            <GenderSelectButton
              gender='male'
              isActive={dogProfile.gender === 'male'}
              onClick={() => handleGenderSelect('male')}
            />
            <GenderSelectButton
              gender='female'
              isActive={dogProfile.gender === 'female'}
              onClick={() => handleGenderSelect('female')}
            />
          </S.GenderSelectBtnWrapper>
          <S.CheckboxWrapper onClick={() => setDogProfile({ isNeutered: !dogProfile.isNeutered })}>
            <S.CheckboxCircle $isChecked={dogProfile.isNeutered}>
              {dogProfile.isNeutered && <img src={Check} alt='check'></img>}
            </S.CheckboxCircle>
            <S.CheckboxLabel $isChecked={dogProfile.isNeutered}>중성화 했어요</S.CheckboxLabel>
          </S.CheckboxWrapper>
        </S.GenderBtnArea>
        <S.InputArea>
          <S.PickerBtn onClick={() => pushModal(<SearchModal />)} $hasBreed={!!dogProfile.breed}>
            {dogProfile.breed || '견종 입력'}
          </S.PickerBtn>
          <S.WeightInput
            placeholder='몸무게 입력 (kg)'
            type={inputType}
            value={displayValue}
            onChange={onChangeWeightInput}
            onFocus={handleFocus}
            onBlur={handleBlur}
            $hasWeight={!!dogProfile.weight}
          />
        </S.InputArea>
        <S.ToastWrapper>
          <ActionButton
            $bgColor={validateDogDetailProfile(dogProfile) ? 'gc_1' : 'default'}
            onClick={handleComfirmClick}
          >
            확인
          </ActionButton>
          <Toast />
        </S.ToastWrapper>
      </S.DogProfileDetailSection>
    </>
  )
}
