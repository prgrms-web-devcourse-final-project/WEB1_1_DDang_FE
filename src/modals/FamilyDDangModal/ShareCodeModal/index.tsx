import * as S from './styles.ts'
import { useModalStore } from '~stores/modalStore.ts'
import { useTheme } from 'styled-components'
import { Typo17, Typo24, Typo15 } from '~components/Typo/index.ts'
import DogImage from '~assets/dog_standup.svg'
import Header from '~components/Header/index.tsx'
import { PrevBtn } from '~components/Button/PrevBtn.ts'

export default function ShareCodeModal() {
  const { popModal } = useModalStore()

  return (
    <S.ShareCodeModal>
      <Header type='lg' prevBtn onClickPrev={popModal}></Header>
      코드 공유 공간입니다~!
    </S.ShareCodeModal>
  )
}
