import { SettingsStoreKey, useSettingsStore } from '~stores/settingsStore'
import { updateSetting } from '~apis/myPage/updateSetting'
import { updateGangbuntta } from '~apis/myPage/updateGangbuntta'

import * as S from './styles'

type ToggleProps = {
  id: string
  setting: SettingsStoreKey
}

export default function Toggle({ id, setting }: ToggleProps) {
  const value = useSettingsStore(state => state.settings[setting])
  const setSetting = useSettingsStore(state => state.setSetting)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newValue = e.target.checked
      // setting이 'messages' 또는 'myWalkNotifications'인 경우에만 API 호출
      if (setting === 'gangbuntta') {
        console.log('강번따 상태 변경 : ', newValue)
        await updateGangbuntta({ isMatched: newValue ? 'TRUE' : 'FALSE' })
      } else if (setting === 'messages' || setting === 'myWalkNotifications') {
        await updateSetting({
          type: setting === 'messages' ? 'CHAT' : 'WALK',
          isAgreed: newValue ? 'TRUE' : 'FALSE',
        })
      }
      // 상태 업데이트
      setSetting(setting, newValue)
    } catch (error) {
      console.error('토글 변경 중 오류 발생:', error)
      // 에러 발생 시 사용자에게 알림
      alert('설정 변경에 실패했습니다. 다시 시도해주세요.')
    }
  }

  return (
    <S.Toggle>
      <input name={id} id={id} type='checkbox' checked={value} onChange={handleChange} hidden />
      <label htmlFor={id}>
        <S.Circle />
      </label>
    </S.Toggle>
  )
}
