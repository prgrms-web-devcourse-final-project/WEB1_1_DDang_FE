import * as S from './styles'
import { PrevButton } from '~components/Button/PrevButton/styles'
import { Typo17 } from '~components/Typo'
import ToggleArea from '~components/ToggleArea'
import ToggleBox from '~components/ToggleBox'
import { useModalStore } from '~stores/modalStore'

export default function SettingModal() {
  const { popModal } = useModalStore()

  return (
    <S.SettingModalContainer>
      <S.Header>
        <S.BackButton onClick={popModal}>
          <PrevButton size={28} />
        </S.BackButton>
        <S.TitleWrap>
          <Typo17 $weight='700'>설정</Typo17>
        </S.TitleWrap>
      </S.Header>

      <S.Content>
        <S.AllButtonWrapper>
          <ToggleBox type='lg' setting='allNotifications' />
        </S.AllButtonWrapper>
        <ToggleArea />
      </S.Content>

      <S.QuitButtonArea>
        <S.CustomQuitButton $type='semiRoundedRect' $bgColor='gc_4' $fontWeight='700'>
          탈퇴하기
        </S.CustomQuitButton>
      </S.QuitButtonArea>
    </S.SettingModalContainer>
  )
}
