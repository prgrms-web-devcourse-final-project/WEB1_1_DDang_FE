import * as S from './styles'
import { Typo15, Typo17 } from '~components/Typo'
import ToggleArea from '~components/ToggleArea'
import ToggleBox from '~components/ToggleBox'
import { useModalStore } from '~stores/modalStore'
import Header from '~components/Header'
import { ActionButton } from '~components/Button/ActionButton'
import { deleteMember } from '~apis/myPage/deleteMember'
import { useNavigate } from 'react-router-dom'
// import { deleteLogoutMember } from '~apis/logout/deleteLogoutMember'
import { getSettings } from '~apis/myPage/getSettings'
import { useSettingsStore } from '~stores/settingsStore'
import { useEffect } from 'react'
export default function SettingModal() {
  const { popModal } = useModalStore()
  const navigate = useNavigate()
  const setSetting = useSettingsStore(state => state.setSetting)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings()
        const gangbunttaState = response.data.isMatched
        const walkState = response.data.settings.WALK.isAgreed // WALK로 수정
        const chatState = response.data.settings.CHAT.isAgreed // CHAT으로 수정        console.log('mywalkState : ', mywalkState)

        setSetting('gangbuntta', gangbunttaState === 'TRUE')
        setSetting('myWalkNotifications', walkState === 'TRUE')
        setSetting('messages', chatState === 'TRUE')
      } catch (error) {
        console.error('설정 불러오기 실패:', error)
      }
    }
    fetchSettings()
  }, [setSetting])

  const onClickLogout = async () => {
    try {
      localStorage.removeItem('token')
      alert('로그아웃 되었습니다.')
      console.log('로그아웃 되었습니다.')
      popModal()
      navigate('/login')
    } catch (error) {
      console.log('로그아웃 중 오류 발생 : ', error)
    }
  }
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
        <ActionButton $type='semiRoundedRect' $bgColor='font_1' onClick={onClickLogout}>
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
