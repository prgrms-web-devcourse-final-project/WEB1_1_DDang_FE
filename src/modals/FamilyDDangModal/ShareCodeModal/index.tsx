import * as S from './styles.ts'
import { useModalStore } from '~stores/modalStore.ts'
import { Typo17, Typo24, Typo15 } from '~components/Typo/index.ts'
import Header from '~components/Header/index.tsx'
import DogImage from '~assets/dog_standup.svg?react'
import { useState } from 'react'

export default function ShareCodeModal() {
  const { popModal } = useModalStore()
  const [familyCode, setFamilyCode] = useState('GaMJATaNG01')

  return (
    <S.ShareCodeModal>
      <Header type='lg' prevBtn onClickPrev={popModal}></Header>
      <S.MainContainer>
        <S.CommentSection>
          <Typo24 $weight='700'>가족과 함께 해요</Typo24>
          <Typo17 $weight='400'>
            가족으로 등록된 회원의 앱에서도 동일한
            <br />
            반려견 프로필을 공유하여
            <br />
            산책을 효율적으로
            <br /> 관리할 수 있어요.
          </Typo17>
        </S.CommentSection>
        <S.DogImageWrapper>
          <DogImage />
        </S.DogImageWrapper>
      </S.MainContainer>
      <S.CodeShareSection>
        <S.CodeShareButtonWrapper>
          <S.CodeShareButton>
            <Typo15 $weight='700'>초대 코드 복사</Typo15>
            <S.FamilyCode></S.FamilyCode>
          </S.CodeShareButton>
          <S.TimerWrapper>
            <p>유효 시간</p>
            <S.Timer>3:00</S.Timer>
          </S.TimerWrapper>
        </S.CodeShareButtonWrapper>
      </S.CodeShareSection>
      <S.Manual>
        <S.FamilyInvitaion />
        <S.FamlyDDangJoin />
      </S.Manual>
    </S.ShareCodeModal>
  )
}
