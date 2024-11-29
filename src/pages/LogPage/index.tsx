import * as S from './styles'
// import { useState } from 'react'
import Header from '~components/Header'
import { Profile } from '~components/Profile'
import { Helmet } from 'react-helmet-async'
import GraphIcon from '~/assets/graph.svg'
import Calendar from './components/Calendar'

export default function LogPage() {
  return (
    <S.LogPage>
      <Helmet>
        <title>DDang | 산책 기록</title>
        <meta name='description' content='반려견과의 소중한 산책 기록을 확인하세요.' />
      </Helmet>
      <Header type={'sm'}>
        <Profile $size={32} $src='test.svg' />
        <S.DogName>밤톨이 일기</S.DogName>
        <S.GraphImage src={GraphIcon} alt='산책 기록 그래프' />
      </Header>
      <S.CalendarWrapper>
        <Calendar />
      </S.CalendarWrapper>
    </S.LogPage>
  )
}
