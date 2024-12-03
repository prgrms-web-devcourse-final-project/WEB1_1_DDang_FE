import * as S from './styles'

const walkData = {
  date: '2024.12.14',
  time: '1:10:00',
  distance: '2.4km',
  calories: '200kcal',
  mapImage: 'https://imagedelivery.net/CJyrB-EkqcsF2D6ApJzEBg/6d853db2-fb51-465c-eaa8-e9e38be01f00/public',
}

export default function WalkCompletePage() {
  return (
    <S.WalkCompletePage>
      <S.Date>{walkData.date}</S.Date>

      <S.Title>
        견주닉넴과 밤톨이가
        <br />
        <span>30분</span>동안 산책했어요.
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
        <img src={walkData.mapImage} alt='산책 경로' />
      </S.MapSection>
    </S.WalkCompletePage>
  )
}
