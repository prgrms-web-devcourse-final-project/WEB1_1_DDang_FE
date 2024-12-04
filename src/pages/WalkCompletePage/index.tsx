import { useLocation } from 'react-router-dom'
import * as S from './styles'

interface WalkCompleteData {
  date: string
  time: string
  distance: string
  calories: string
  mapImage: string
}

export default function WalkCompletePage() {
  const location = useLocation()
  const walkData: WalkCompleteData = {
    date: new Date()
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '.'),
    time: location.state?.time || '00:00:00',
    distance: location.state?.distance || '0m',
    calories: '200kcal',
    mapImage: location.state?.mapImage || '',
  }

  console.log(walkData)

  const getMinutesFromTime = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const walkTimeInMinutes = getMinutesFromTime(walkData.time)

  return (
    <S.WalkCompletePage>
      <S.Date>{walkData.date}</S.Date>

      <S.Title>
        견주닉넴과 밤톨이가
        <br />
        <span>{walkTimeInMinutes}분</span>동안 산책했어요.
      </S.Title>
      <S.DogImageArea>
        <S.DogImage />
      </S.DogImageArea>

      <S.WalkStats>
        <S.StatItem>
          <S.StatValue className='value'>{walkData.time}</S.StatValue>
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
