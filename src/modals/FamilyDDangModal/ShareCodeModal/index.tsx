import * as S from './styles.ts'
import { useModalStore } from '~stores/modalStore.ts'
import { useTheme } from 'styled-components'
import { Typo17, Typo24, Typo15 } from '~components/Typo/index.ts'
import Header from '~components/Header/index.tsx'
import DogImage from '~assets/dog_standup.svg?react'

export default function ShareCodeModal() {
  const { popModal } = useModalStore()

  return (
    <S.ShareCodeModal>
      <Header type='lg' prevBtn onClickPrev={popModal}></Header>
      <S.MainContainer>
        <S.CommentSection>
          <Typo24 $weight='700'>가족과 함께 해요</Typo24>
          <Typo17 $weight='400'>
            가족으로 등록된 회원의 앱에서도 동일한 반려견 프로필을 공유하여 산책을 효율적으로 관리할 수 있어요.
          </Typo17>
        </S.CommentSection>
        <S.DogImageWrapper>
          <DogImage />
        </S.DogImageWrapper>
      </S.MainContainer>
      <S.CodeShareSection>
        <S.CodeShareButtonWrapper>
          <S.CodeShareButton>
            <Typo15 $weight='700' >초대 코드 복사</Typo15>
          </S.CodeShareButton>
        </S.CodeShareButtonWrapper>
      </S.CodeShareSection>
    </S.ShareCodeModal>
  )
}
