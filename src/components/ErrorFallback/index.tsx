import { FallbackProps } from 'react-error-boundary'
import { ActionButton } from '~components/Button/ActionButton'
import { Typo15, Typo17 } from '~components/Typo'
import * as S from './styles'

type ErrorFallbackProps = FallbackProps

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <S.ErrorFallback>
      <Typo17 $weight='700'>{error.message}...</Typo17>
      <Typo15>
        오류가 발생했네요!
        <br />
        아래 버튼을 통해 다시 요청해보세요!
      </Typo15>

      <ActionButton $type='roundedRect' onClick={() => resetErrorBoundary()}>
        다시 불러오기!
      </ActionButton>
    </S.ErrorFallback>
  )
}
