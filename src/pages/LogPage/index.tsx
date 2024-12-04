import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import GraphIcon from '~/assets/graph.svg'
import NoWalkSummaryImg from '~/assets/no-walk-summary.svg'
import NoWalkSummaryImg2 from '~/assets/no-walk-summary2.svg'
import { fetchWalkDetail } from '~apis/log/fetchWalkDetail'
import Header from '~components/Header'
import WalkAnalysisModal from '~modals/WalkAnalysisModal'
import { useModalStore } from '~stores/modalStore'
import { dateToString, formatTime } from '~utils/dateFormat'
import Calendar from './components/Calendar'
import WalkSummary from './components/WalkSummary'
import * as S from './styles'

interface TimeDuration {
  hours: number
  minutes: number
  seconds: number
}

interface WalkDetail {
  name: string
  points: string
  timeDuration: TimeDuration
  profileImg: string
  totalCalorie: number
  totalDistanceMeter: number
}

export default function LogPage() {
  const images = [NoWalkSummaryImg, NoWalkSummaryImg2]
  const randomIndex = Math.floor(Math.random() * images.length)
  const randomImage = images[randomIndex]
  const { pushModal } = useModalStore()
  const [date, setDate] = useState<Date>(new Date())
  const [walkDetails, setWalkDetails] = useState<WalkDetail[]>()

  useEffect(() => {
    const getWalkDetail = async () => {
      console.log(date)
      try {
        const response = await fetchWalkDetail(dateToString(date))
        console.log('산책 내역 상세 조회', response.data)
        setWalkDetails(response.data)
      } catch (e) {
        console.error(e)
      }
    }

    getWalkDetail()
  }, [date])

  return (
    <S.LogPage>
      <Helmet>
        <title>DDang | 산책 기록</title>
        <meta name='description' content='반려견과의 소중한 산책 기록을 확인하세요.' />
      </Helmet>
      <Header type={'sm'}>
        <S.ProfileImg src='test.svg' alt='프로필 사진' />
        <S.DogName>밤톨이 일기</S.DogName>
        <S.GraphImage src={GraphIcon} alt='산책 기록 그래프' onClick={() => pushModal(<WalkAnalysisModal />)} />
      </Header>
      <S.CalendarWrapper>
        <Calendar setDate={setDate} />
      </S.CalendarWrapper>
      <S.WalkSummaryWrapper>
        {walkDetails?.map((walkDetail, index) => (
          <WalkSummary
            key={index}
            profileImg={walkDetail.profileImg}
            userName={walkDetail.name}
            walkPhoto={walkDetail.profileImg}
            walkDuration={formatTime(
              walkDetail.timeDuration.hours,
              walkDetail.timeDuration.minutes,
              walkDetail.timeDuration.seconds
            )}
            walkDistance={walkDetail.totalDistanceMeter}
            calories={walkDetail.totalCalorie}
          />
        ))}
        {!walkDetails?.length && (
          <S.NoWalkSummary>
            {/* {!randomIndex && (
              <p>
                산책 좀<br />
                시켜주세요 주인님!
              </p>
            )} */}
            <img src={randomImage} alt='산책 기록 없음' />
            <p>산책 기록이 없어요</p>
          </S.NoWalkSummary>
        )}
      </S.WalkSummaryWrapper>
    </S.LogPage>
  )
}
