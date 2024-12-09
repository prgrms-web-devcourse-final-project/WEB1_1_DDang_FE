import { useState, useEffect } from 'react'
import { usePatchDogProfile } from '~apis/dog/useDogProfile'
import Check from '~assets/is-neutered-check.svg'
import { ActionButton } from '~components/Button/ActionButton'
import GenderSelectButton from '~components/GenderSelectButton/index'
import Header from '~components/Header/index'
import TwoLineInput from '~components/Input/TwoLineInput/index'
import Toast from '~components/Toast/index'
import { Typo24 } from '~components/Typo/index'
import DatePickerModal from '~modals/DatePickerModal/index'
import SearchModal from '~modals/SearchModal/index'
import { useModalStore } from '~stores/modalStore'
import { useToastStore } from '~stores/toastStore'
import { dateToString, stringToDate } from '~utils/dateFormat'
import { validateDogDetailProfile, validateDogProfile } from '~utils/validateDogProfile'
import DogImageUploader from './DogImageUploader'
import * as S from './styles'
import { useMyPage } from '~apis/myPage/useMyPage'
import { DogProfileType } from '~types/dogProfile'

interface EditDogProfileModalProps {
  dogId: number
}

export default function EditDogProfileModal({ dogId }: EditDogProfileModalProps) {
  const { data, refetch } = useMyPage()
  const [dogProfile, setDogProfile] = useState<DogProfileType | null>(null)
  const patchDogProfileMutation = usePatchDogProfile(dogId)
  const { popModal, pushModal } = useModalStore()
  const { showToast } = useToastStore()
  const [displayValue, setDisplayValue] = useState('')
  const [inputType, setInputType] = useState('text')

  useEffect(() => {
    if (data?.dog) {
      setDogProfile(data.dog)
      setDisplayValue(data.dog.weight ? `${data.dog.weight}kg` : '')
    } else refetch()
  }, [data])

  if (!dogProfile) {
    return null
  }

  const updateDogProfile = (update: Partial<DogProfileType>) => {
    setDogProfile(prev => {
      if (!prev) return null
      return {
        ...prev,
        ...update,
      } as DogProfileType
    })
  }

  const handleGenderSelect = (gender: 'MALE' | 'FEMALE') => {
    updateDogProfile({ gender })
  }

  const onChangeWeightInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '') {
      updateDogProfile({ weight: undefined })
      setDisplayValue('')
      return
    }

    if (/^\d*\.?\d*$/.test(value)) {
      const formatted = value.includes('.') ? value.match(/^\d*\.?\d{0,2}/)![0] : value

      updateDogProfile({ weight: Number(formatted) })
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
        setDate={date => updateDogProfile({ birthDate: dateToString(date) })}
      />
    )
  }

  const handleComfirmClick = async () => {
    let alertMessage = validateDogProfile(dogProfile!)
    if (alertMessage) {
      showToast(alertMessage)
      return
    }
    alertMessage = validateDogDetailProfile(dogProfile!)
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
    console.log('hi')
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
        image={dogProfile?.profileImg}
        setImage={({ profileImg, profileImgFile }) =>
          updateDogProfile({
            profileImg,
            profileImgFile,
          })
        }
      />
      <S.InputArea>
        <S.NameInput
          placeholder='이름 입력'
          value={dogProfile.name}
          onChange={e => updateDogProfile({ name: e.target.value })}
        />
        <S.PickerBtn
          onClick={() => pushModal(<SearchModal setDogProfile={update => updateDogProfile(update)} />)}
          $hasBreed={!!dogProfile.breed}
        >
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
          onClick={() => updateDogProfile({ isNeutered: dogProfile.isNeutered == 'TRUE' ? 'FALSE' : 'TRUE' })}
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
          onChange={e => updateDogProfile({ comment: e.target.value })}
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
