import * as S from './styles'
import { Typo15, Typo17 } from '~components/Typo'
import ToggleArea from '~components/ToggleArea'
import ToggleBox from '~components/ToggleBox'
import { useModalStore } from '~stores/modalStore'
import Header from '~components/Header'
import { ActionButton } from '~components/Button/ActionButton'
import { deleteMember } from '~apis/myPage/deleteMember'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export default function SettingModal() {
  const { popModal } = useModalStore()
  const navigate = useNavigate()

  const handleDeleteMember = async () => {
    try {
      const isConfirmed = window.confirm('정말 탈퇴하시겠습니까?')
      if (isConfirmed) {
        await deleteMember()
        localStorage.removeItem('token')
        console.log('회원탈퇴. 토큰삭제 완료')
        popModal()
        navigate('/login')
      }
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error)
    }
  }

  return (
    <S.SettingModalContainer>
      <Header type='sm' prevBtn onClickPrev={popModal}>
        <S.TitleWrap>
          <Typo17 $weight='700'>설정</Typo17>
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
          <Typo15 color='lighten_1' onClick={handleDeleteMember}>
            탈퇴하기
          </Typo15>
        </S.QuitButton>
      </S.ButtonArea>
    </S.SettingModalContainer>
  )
}
