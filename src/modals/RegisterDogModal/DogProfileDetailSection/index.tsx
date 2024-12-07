import { useState } from 'react'
import { useDogProfileStore } from '~/stores/dogProfileStore'
import Check from '~assets/is-neutered-check.svg'
import { ActionButton } from '~components/Button/ActionButton'
import GenderSelectButton from '~components/GenderSelectButton'
import Header from '~components/Header/index'
import Toast from '~components/Toast'
import { Typo24 } from '~components/Typo/index'
import SearchModal from '~modals/SearchModal'
import { useCreateDogProfile } from '~apis/dog/useDogProfile'
import { useModalStore } from '~stores/modalStore'
import { useToastStore } from '~stores/toastStore'
import { validateDogDetailProfile } from '~utils/validateDogProfile'
import * as S from './styles'

export default function DogProfileDetailSection() {
  const { dogProfile, setDogProfile } = useDogProfileStore()
  const { pushModal, popModal } = useModalStore()
  const { showToast } = useToastStore()
  const createDogProfile = useCreateDogProfile()

  const [displayValue, setDisplayValue] = useState(dogProfile.weight && dogProfile.weight + 'kg')
  const [inputType, setInputType] = useState('text')

  const handleGenderSelect = (gender: 'MALE' | 'FEMALE') => {
    setDogProfile({ gender })
  }

  const onChangeWeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setDogProfile({ weight: 0 })
      setDisplayValue('')
      return
    }

    if (/^\d*\.?\d*$/.test(value)) {
      const formatted = value.includes('.') ? value.match(/^\d*\.?\d{0,2}/)![0] : value

      setDogProfile({ weight: Number(formatted) })
      setDisplayValue(inputType === 'number' ? formatted : `${formatted}kg`)
    }
  }

  const handleFocus = () => {
    setInputType('number')
    setDisplayValue(dogProfile.weight?.toString())
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

    const formData = new FormData()
    const requestData = {
      ...dogProfile,
      famliyId: null,
    }
    formData.append(
      'request',
      new Blob([JSON.stringify(requestData)], {
        type: 'application/json',
      })
    )
    if (dogProfile.profileImgFile) formData.append('profileImgFile', dogProfile.profileImgFile)
    createDogProfile.mutate(formData)
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
              gender='MALE'
              isActive={dogProfile.gender === 'MALE'}
              onClick={() => handleGenderSelect('MALE')}
            />
            <GenderSelectButton
              gender='FEMALE'
              isActive={dogProfile.gender === 'FEMALE'}
              onClick={() => handleGenderSelect('FEMALE')}
            />
          </S.GenderSelectBtnWrapper>
          <S.CheckboxWrapper
            onClick={() => setDogProfile({ isNeutered: dogProfile.isNeutered == 'TRUE' ? 'FALSE' : 'TRUE' })}
          >
            <S.CheckboxCircle $isChecked={dogProfile.isNeutered == 'TRUE'}>
              {dogProfile.isNeutered == 'TRUE' && <img src={Check} alt='check'></img>}
            </S.CheckboxCircle>
            <S.CheckboxLabel $isChecked={dogProfile.isNeutered == 'TRUE'}>중성화 했어요</S.CheckboxLabel>
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
