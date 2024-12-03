import Toggle from '~components/Toggle'
import { Typo14, Typo15, Typo17 } from '~components/Typo'
import { SETTINGS_INFO } from '~constants/settingsInfo'
import { SettingsStoreKey } from '~stores/settingsStore'
import * as S from './styles'

type ToggleBoxProps = {
  type: 'sm' | 'md' | 'lg'
  setting: SettingsStoreKey
}

const Typo = {
  sm: Typo14,
  md: Typo15,
  lg: Typo17,
}

/**
 *주의! 단독으로 사용할 경우, Wrapper로 감싸주셔야 border radius가 적용됩니다.
 */
export default function ToggleBox({ setting, type }: ToggleBoxProps) {
  const SelectedTypo = Typo[type]

  return (
    <S.ToggleBox $type={type}>
      <S.MainArea>
        <SelectedTypo $weight='700'>{SETTINGS_INFO[setting].title}</SelectedTypo>
        {SETTINGS_INFO[setting].desc && <Typo15>{SETTINGS_INFO[setting].desc}</Typo15>}
      </S.MainArea>
      <Toggle id={setting} setting={setting} />
    </S.ToggleBox>
  )
}
