import * as S from './styles'
import { formatTime } from '~utils/dateFormat'
import { TotalWalkRecordsResponse } from '~apis/log/fetchTotalWalkRecords'

interface StatisticsProps {
  title: string
  stats: TotalWalkRecordsResponse
}

export default function Statistics({ title, stats }: StatisticsProps) {
  return (
    <S.Statistics>
      <h3>{title}</h3>
      <div>
        <div>
          <p>산책 시간</p>
          <strong>
            {formatTime(stats.timeDuration.hours, stats.timeDuration.minutes, stats.timeDuration.seconds)}
          </strong>
        </div>
        <div>
          <p>산책 기록</p>
          <strong>{stats.walkCount}회</strong>
        </div>
        <div>
          <p>산책 거리</p>
          <strong>{stats.totalDistanceKilo}km</strong>
        </div>
      </div>
    </S.Statistics>
  )
}
