import { SettingsStoreKey, useSettingsStore } from '~stores/settingsStore'
import { updateSetting } from '~apis/myPage/updateSetting'
import * as S from './styles'

type ToggleProps = {
  id: string
  setting: SettingsStoreKey
}

// 설정 키를 API type으로 매핑
const settingToApiType = {
  gangbuntta: 'GANGBUNTTA',
  messages: 'CHAT',
  myWalkNotifications: 'WALK',
} as const

export default function Toggle({ id, setting }: ToggleProps) {
  const value = useSettingsStore(state => state[setting])
  const setSetting = useSettingsStore(state => state.setSetting)

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.checked
    setSetting(setting, newValue)

    // API 호출이 필요한 설정인 경우에만 실행
    if (setting in settingToApiType) {
      try {
        const apiType = settingToApiType[setting as keyof typeof settingToApiType]
        const response = await updateSetting({
          type: apiType,
          isAgreed: newValue ? 'TRUE' : 'FALSE',
        })
        console.log('설정 업데이트 결과:', response)
      } catch (error) {
        console.error('설정 업데이트 실패:', error)
        // 에러 발생 시 상태를 원래대로 되돌림
        setSetting(setting, !newValue)
      }
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
