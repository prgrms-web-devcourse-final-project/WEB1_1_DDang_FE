import * as S from './styles'
import { ActionButton } from '~components/Button/ActionButton'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'
import { Profile } from '~components/Profile'
import Tag from '~components/Tag'

export default function CheckDogProfileSection() {
  const handleClickPrev = () => {}

  return (
    <>
      <Header type='sm' onClickPrev={handleClickPrev} prevBtn={true} />
      <S.CheckDogProfileSection>
        <S.ProfileArea>
          <S.TypoWrapper>
            <Typo24 $weight='700'>
              이 반려견이
              <br />
              맞나요?
            </Typo24>
          </S.TypoWrapper>
          <S.ProfileWrapper>
            {/* 온라인 이미지여서 최적화 관련 uses-rel-preconnect 에러가 발생합니다! 일단 lighthouserc에서 warning으로 바꾸어 놓았습니다. 
            차후 실제 이미지로 바꾸게 되면 관련 설정을 'uses-rel-preconnect': 'warn' 부분을 제거해서 에러를 활성화해주시고
             index.html 파일에서 <link rel="preconnect" href="https://fastly.jsdelivr.net" crossorigin />과 같이 
             url을 추가해주세요.
             */}
            <Profile
              $size={180}
              $src={
                'https://www.shutterstock.com/image-photo/beautiful-golden-retriever-cute-puppy-260nw-2526542701.jpg'
              }
            />
            <S.TagWrapper>
              <Tag content='밤톨' />
              <Tag content='토이푸들' />
              <Tag content='2년' />
            </S.TagWrapper>
          </S.ProfileWrapper>
        </S.ProfileArea>
        <ActionButton>다음</ActionButton>
      </S.CheckDogProfileSection>
    </>
  )
}
