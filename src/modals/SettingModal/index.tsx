import * as S from './styles'
import { Typo15, Typo17 } from '~components/Typo'
import ToggleArea from '~components/ToggleArea'
import ToggleBox from '~components/ToggleBox'
import { useModalStore } from '~stores/modalStore'
import Header from '~components/Header'
import { ActionButton } from '~components/Button/ActionButton'
export default function SettingModal() {
  const { popModal } = useModalStore()

  return (
    <S.SettingModalContainer>
      <Header type='sm' prevBtn onClickPrev={popModal}>
        <S.TitleWrap>
          <Typo17 weight='700'>설정</Typo17>
        </S.TitleWrap>
      </Header>

      <S.Content>
        <S.GangbunttaArea>
          <ToggleBox type='lg' setting='gangbuntta' />
        </S.GangbunttaArea>
        <ToggleArea />
      </S.Content>

      <S.ButtonArea>
        <ActionButton $type='semiRoundedRect' $bgColor='font_1'>
          로그아웃
        </ActionButton>
        <S.QuitButton>
          <Typo15 color='lighten_1'>탈퇴하기</Typo15>
        </S.QuitButton>
      </S.ButtonArea>
    </S.SettingModalContainer>
  )
}
