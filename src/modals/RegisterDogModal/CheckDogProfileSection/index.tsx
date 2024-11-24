import * as S from './styles'
import { ActionButton } from '~components/Button/ActionButton'
import Header from '~components/Header/index'
import { Typo24 } from '~components/Typo/index'
import { Profile } from '~components/Profile'
import Tag from '../../../components/Tag'

export default function CheckDogProfileSection() {
  const handleClickPrev = () => {}

  return (
    <>
      <Header type='sm' onClickPrev={handleClickPrev} prevBtn />
      <S.CheckDogProfileSection>
        <S.ProfileArea>
          <S.TypoWrapper>
            <Typo24 weight='700'>
              이 반려견이
              <br />
              맞나요?
            </Typo24>
          </S.TypoWrapper>
          <S.ProfileWrapper>
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
