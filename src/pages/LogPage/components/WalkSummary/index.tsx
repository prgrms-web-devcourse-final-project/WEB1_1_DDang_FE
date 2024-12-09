import * as S from './styles'
import WalkDurationImg from '~assets/walk-duration.svg'
import WalkDistanceImg from '~assets/walk-distance.svg'
import CaloriesBurnedImg from '~assets/calories-burned.svg'

interface WalkSummaryProps {
  profileImg: string
  userName: string
  walkPhoto: string
  walkDuration: string
  walkDistance: number
  calories: number
}

export default function WalkSummary(props: WalkSummaryProps) {
  const { profileImg, userName, walkPhoto, walkDuration, walkDistance, calories } = props
  return (
    <S.WalkSummary>
      <S.UserProfile>
        <S.ProfileImg src={profileImg} alt='프로필 사진' />
        <S.UserName>{userName}</S.UserName>
      </S.UserProfile>
      <S.WalkPhoto>
        <img src={walkPhoto} alt='산책 기록 사진' />
      </S.WalkPhoto>
      <S.WalkInfo>
        <div>
          <img src={WalkDurationImg} alt='산책 시간' />
          <p>{walkDuration}</p>
        </div>
        <div>
          <img src={WalkDistanceImg} alt='산책 거리' />
          <p>{walkDistance}km</p>
        </div>
        <div>
          <img src={CaloriesBurnedImg} alt='소비 칼로리' />
          <p>{calories}kcal</p>
        </div>
      </S.WalkInfo>
    </S.WalkSummary>
  )
}
