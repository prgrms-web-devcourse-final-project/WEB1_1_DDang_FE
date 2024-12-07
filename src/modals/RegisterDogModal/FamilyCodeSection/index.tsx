import * as S from './styles'
import { useState } from 'react'
import { ActionButton } from '~components/Button/ActionButton'
import { PrevBtn } from '~components/Button/PrevBtn'
import { Typo24 } from '~components/Typo/index'
import Header from '~components/Header/index'
import { useModalStore } from '~stores/modalStore'
import CheckDogProfileSection from '../CheckDogProfileSection'
import { useToastStore } from '~stores/toastStore'
import { validateFamilyCode } from '~utils/validateDogProfile'
import Toast from '~components/Toast'
import { joinFamily } from '~apis/family/joinFamily'

export default function FamilyCodeSection() {
  const { pushModal, popModal } = useModalStore()
  const [familyCode, setFamilyCode] = useState('')
  const { showToast } = useToastStore()

  const handleClickNext = async () => {
    const alertMessage = validateFamilyCode(familyCode)
    if (alertMessage) {
      showToast(alertMessage)
      return
    }
    try {
      const response = await joinFamily('ABC12345')
      if (response.code === 200) pushModal(<CheckDogProfileSection />)
    } catch (error) {
      if (error instanceof Error) showToast(error.message)
    }
  }
  return (
    <>
      <S.FamilyCodeSection>
        <Header type='sm' onClickPrev={popModal} prevBtn />
        <S.PrevBtnWrapper>
          <PrevBtn />
        </S.PrevBtnWrapper>
        <S.InputArea>
          <S.TypoWrapper>
            <Typo24 $weight='700' $textAlign='center'>
              가족에게 받은
              <br />
              코드를 입력해 주세요.
            </Typo24>
          </S.TypoWrapper>
          <S.FamilyCodeInput type='text' placeholder='가족코드 입력' onChange={e => setFamilyCode(e.target.value)} />
        </S.InputArea>
        <S.ToastWrapper>
          <ActionButton $bgColor={familyCode ? 'default' : 'gc_1'} onClick={handleClickNext}>
            다음
          </ActionButton>
          <Toast />
        </S.ToastWrapper>
      </S.FamilyCodeSection>
    </>
  )
}
