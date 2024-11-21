import { SettingsStoreKey, useSettingsStore } from '~stores/settingsStore'
import * as S from './styles'

type ToggleProps = {
  id: string
  setting: SettingsStoreKey
}

export default function Toggle({ id, setting }: ToggleProps) {
  const value = useSettingsStore(state => state[setting])
  const setSetting = useSettingsStore(state => state.setSetting)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSetting(setting, e.target.checked)
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
