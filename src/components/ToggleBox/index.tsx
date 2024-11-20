import Toggle from '@components/Toggle'
import { SettingsStoreKey } from '@stores/settingsStore'
import * as S from './styles'
import { SETTINGS_INFO } from '@constants/settingsInfo'
import { Typo15, Typo17 } from '@/styles/common.typos'

type ToggleBoxProps = {
  setting: SettingsStoreKey
}

//todo 부가설명란
export default function ToggleBox({ setting }: ToggleBoxProps) {
  return (
    <S.ToggleBox>
      <S.MainArea>
        <Typo17 color='font_1'>{SETTINGS_INFO[setting].title}</Typo17>
        {SETTINGS_INFO[setting].desc ? <Typo15>{SETTINGS_INFO[setting].desc}</Typo15> : null}
      </S.MainArea>
      <Toggle id={setting} setting={setting} />
    </S.ToggleBox>
  )
}
