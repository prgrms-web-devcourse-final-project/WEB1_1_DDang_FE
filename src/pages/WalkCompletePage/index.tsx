import { useLocation } from 'react-router-dom'
import * as S from './styles'

interface WalkCompleteData {
  dogName: string
  memberName: string
  date: string
  timeDuration: { hours: number; minutes: number; seconds: number }
  distance: string
  calories: string
  mapImage: string
}

export default function WalkCompletePage() {
  const location = useLocation()
  console.log(location.state)
  const walkData: WalkCompleteData = {
    dogName: location.state?.dogName || '',
    memberName: location.state?.memberName || '',
    date: new Date()
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '.'),
    timeDuration: location.state?.timeDuration,
    distance: `${location.state?.totalDistanceMeter}m` || '0m',
    calories: `${location.state?.totalCalorie}kcal` || '0kcal',
    mapImage: location.state?.walkImg || '',
  }

  console.log(walkData)

  const getMinutesFromTime = (time: { hours: number; minutes: number; seconds?: number }) => {
    const { hours, minutes } = time
    return hours * 60 + minutes
  }

  const walkTimeInMinutes = getMinutesFromTime(walkData.timeDuration)

  return (
    <S.WalkCompletePage>
      <S.Date>{walkData.date}</S.Date>

      <S.Title>
        {walkData.memberName}와(과) {walkData.dogName}가
        <br />
        <span>{walkTimeInMinutes}분</span>동안 산책했어요.
      </S.Title>
      <S.DogImageArea>
        <S.DogImage />
      </S.DogImageArea>

      <S.WalkStats>
        <S.StatItem>
          <S.StatValue className='value'>{`${walkData.timeDuration.hours} : ${walkData.timeDuration.minutes} : ${walkData.timeDuration.seconds}`}</S.StatValue>
          <S.StatLabel className='label'>산책 시간</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue className='value'>{walkData.distance}</S.StatValue>
          <S.StatLabel className='label'>산책 거리</S.StatLabel>
        </S.StatItem>
        <S.StatItem>
          <S.StatValue className='value'>{walkData.calories}</S.StatValue>
          <S.StatLabel className='label'>소모한 칼로리</S.StatLabel>
        </S.StatItem>
      </S.WalkStats>

      <S.MapSection>
        <img src={`${walkData.mapImage}`} alt='산책 경로' style={{ width: '100%', height: '100%' }} />
      </S.MapSection>
    </S.WalkCompletePage>
  )
}
