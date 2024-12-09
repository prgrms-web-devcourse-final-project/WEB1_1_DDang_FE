import { FallbackProps } from 'react-error-boundary'
import { Typo15 } from '~components/Typo'
import * as S from './styles'

type ErrorFallbackProps = FallbackProps

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <S.ErrorFallback>
      <Typo15 $weight='700'>{error.message}...</Typo15>
      <S.ResetButton onClick={() => resetErrorBoundary()}>다시 불러오기!</S.ResetButton>
    </S.ErrorFallback>
  )
}
