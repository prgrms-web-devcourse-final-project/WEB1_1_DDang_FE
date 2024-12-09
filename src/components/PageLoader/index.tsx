import DogRun1 from '~assets/dog_run1.svg?react'
import DogRun2 from '~assets/dog_run2.svg?react'
import DogRun3 from '~assets/dog_run3.svg?react'
import DogRun4 from '~assets/dog_run4.svg?react'
import * as S from './styles'

export default function PageLoader() {
  return (
    <S.PageLoader>
      <S.DogAnimation>
        <DogRun1 />
        <DogRun2 />
        <DogRun3 />
        <DogRun4 />
      </S.DogAnimation>
    </S.PageLoader>
  )
}
