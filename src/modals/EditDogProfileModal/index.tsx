import { useState, useEffect } from 'react'
import { Typo24 } from '~components/Typo/index'
import * as S from './styles'
import { useModalStore } from '~stores/modalStore'
import SearchModal from '~modals/SearchModal/index'
import { useToastStore } from '~stores/toastStore'
import Header from '~components/Header/index'
import { validateDogProfile, validateDogDetailProfile } from '~utils/validateDogProfile'
import GenderSelectButton from '~components/GenderSelectButton/index'
import TwoLineInput from '~components/Input/TwoLineInput/index'
import Toast from '~components/Toast/index'
import { ActionButton } from '~components/Button/ActionButton'
import Check from '~assets/is-neutered-check.svg'
import DogImageUploader from './DogImageUploader'
import DatePickerModal from '~modals/DatePickerModal/index'
import { dateToString, stringToDate } from '~utils/dateFormat'
import { DogProfileType } from '~types/dogProfile'
// import { patchDogProfile } from '~apis/dog/patchDogProfile'
import { usePatchDogProfile } from '~apis/dog/useDogProfile'

interface EditDogProfileProps {
  initialDogProfile: DogProfileType
}

export default function EditDogProfileModal({ initialDogProfile }: EditDogProfileProps) {
  const { popModal, pushModal } = useModalStore()
  const { showToast } = useToastStore()

  const [dogProfile, setDogProfile] = useState<DogProfileType>(initialDogProfile)
  const [displayValue, setDisplayValue] = useState(initialDogProfile.weight + 'kg')
  const [inputType, setInputType] = useState('text')
  const patchDogProfileMutation = usePatchDogProfile(dogProfile.dogId)

  const handleGenderSelect = (gender: 'MALE' | 'FEMALE') => {
    setDogProfile(prev => ({ ...prev, gender }))
  }

  const onChangeWeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      setDogProfile(prev => ({ ...prev, weight: 0 }))
      setDisplayValue('')
      return
    }

    if (/^\d*\.?\d*$/.test(value)) {
      const formatted = value.includes('.') ? value.match(/^\d*\.?\d{0,2}/)![0] : value

      setDogProfile(prev => ({ ...prev, weight: Number(formatted) }))
      setDisplayValue(inputType === 'number' ? formatted : `${formatted}kg`)
    }
  }

  const handleFocus = () => {
    setInputType('number')
    setDisplayValue(dogProfile.weight?.toString() || '')
  }

  const handleBlur = () => {
    setInputType('text')
    if (dogProfile.weight) {
      setDisplayValue(`${dogProfile.weight}kg`)
    }
  }

  const handleDatePickerOpen = () => {
    pushModal(
      <DatePickerModal
        date={dogProfile.birthDate ? stringToDate(dogProfile.birthDate) : new Date()}
        setDate={date => setDogProfile(prev => ({ ...prev, birthDate: dateToString(date) }))}
      />
    )
  }

  const handleComfirmClick = async () => {
    let alertMessage = validateDogProfile(dogProfile)
    if (alertMessage) {
      showToast(alertMessage)
      return
    }
    alertMessage = validateDogDetailProfile(dogProfile)
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
    patchDogProfileMutation.mutate(formData)
  }

  return (
    <S.EditDogProfileModal>
      <Header type='sm' onClickPrev={() => popModal()} prevBtn />
      <S.TypoWrapper>
        <Typo24 $weight='700' $textAlign='center'>
          반려견 정보 수정
        </Typo24>
      </S.TypoWrapper>
      <DogImageUploader
        image={dogProfile.profileImg}
        setImage={({ profileImg, profileImgFile }) =>
          setDogProfile(prev => ({
            ...prev,
            profileImg,
            profileImgFile,
          }))
        }
      />
      <S.InputArea>
        <S.NameInput
          placeholder='이름 입력'
          value={dogProfile.name}
          onChange={e => setDogProfile(prev => ({ ...prev, name: e.target.value }))}
        />
        <S.PickerBtn onClick={() => pushModal(<SearchModal />)} $hasBreed={!!dogProfile.breed}>
          {dogProfile.breed || '견종 입력'}
        </S.PickerBtn>
        <S.DatePickerBtn onClick={handleDatePickerOpen} $hasBirth={!!dogProfile.birthDate}>
          {dogProfile.birthDate?.split('-').join('. ') || '생년월일 선택'}
        </S.DatePickerBtn>
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
          onClick={() =>
            setDogProfile(prev => ({ ...prev, isNeutered: dogProfile.isNeutered == 'TRUE' ? 'FALSE' : 'TRUE' }))
          }
        >
          <S.CheckboxCircle $isChecked={dogProfile.isNeutered == 'TRUE'}>
            {dogProfile.isNeutered == 'TRUE' && <img src={Check} alt='check'></img>}
          </S.CheckboxCircle>
          <S.CheckboxLabel $isChecked={dogProfile.isNeutered == 'TRUE'}>중성화 했어요</S.CheckboxLabel>
        </S.CheckboxWrapper>
      </S.GenderBtnArea>
      <S.TwoLineinputWrapper>
        <TwoLineInput
          placeholder='한줄 소개 입력'
          value={dogProfile.comment}
          onChange={e => setDogProfile(prev => ({ ...prev, comment: e.target.value }))}
        >
          한줄 소개 입력
        </TwoLineInput>
      </S.TwoLineinputWrapper>
      <S.ToastWrapper>
        <ActionButton
          $bgColor={validateDogDetailProfile(dogProfile) && validateDogProfile(dogProfile) ? 'gc_1' : 'default'}
          onClick={handleComfirmClick}
        >
          확인
        </ActionButton>
        <Toast />
      </S.ToastWrapper>
    </S.EditDogProfileModal>
  )
}
