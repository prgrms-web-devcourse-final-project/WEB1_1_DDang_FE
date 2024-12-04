import * as S from './styles'
import { useEffect } from 'react'
import Header from '~components/Header'
import { Helmet } from 'react-helmet-async'
import GraphIcon from '~/assets/graph.svg'
import Calendar from './components/Calendar'
// import WalkSummary from './components/WalkSummary'
// import TestImg from '~assets/masterprofile.svg'
import NoWalkSummaryImg from '~/assets/no-walk-summary.svg'
import NoWalkSummaryImg2 from '~/assets/no-walk-summary2.svg'
import { useModalStore } from '~stores/modalStore'
import WalkAnalysisModal from '~modals/WalkAnalysisModal'
import { fetchWalkDates } from '~apis/log/fetchWalkDates'

import { fetchWalkDetail } from '~apis/log/fetchWalkDetail'
import { dateToString } from '~utils/dateFormat'

export default function LogPage() {
  const images = [NoWalkSummaryImg, NoWalkSummaryImg2]
  const randomIndex = Math.floor(Math.random() * images.length)
  const randomImage = images[randomIndex]
  const { pushModal } = useModalStore()

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await fetchWalkDates()

      const formattedDate = dateToString(new Date())
      const res6 = await fetchWalkDetail(formattedDate)
      console.log('산책한 날짜 리스트', res1)

      console.log('산책 내역 상세 조회', res6)
    }

    fetchData()
  }, [])
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
        <Calendar />
      </S.CalendarWrapper>
      <S.WalkSummaryWrapper>
        {/* <WalkSummary
          profileImg={TestImg}
          userName='감자탕수육'
          walkPhoto='https://img1.yna.co.kr/etc/inner/KR/2021/01/22/AKR20210122107000017_06_i_P2.jpg'
          walkDuration='1:10:10'
          walkDistance={3.3}
          calories={212}
        />
        <WalkSummary
          profileImg={TestImg}
          userName='감자탕수육'
          walkPhoto='https://img1.yna.co.kr/etc/inner/KR/2021/01/22/AKR20210122107000017_06_i_P2.jpg'
          walkDuration='1:10:10'
          walkDistance={3.3}
          calories={212}
        /> */}
        <S.NoWalkSummary>
          {!randomIndex && (
            <p>
              산책 좀<br />
              시켜주세요 주인님!
            </p>
          )}
          <img src={randomImage} alt='산책 기록 없음' />
          <p>산책 기록이 없어요</p>
        </S.NoWalkSummary>
      </S.WalkSummaryWrapper>
    </S.LogPage>
  )
}
