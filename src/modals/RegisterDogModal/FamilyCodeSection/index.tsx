import * as S from './styles'
import { ActionButton } from '~components/Button/ActionButton'
import PrevButton from '~components/Button/PrevButton'
import { Typo24 } from '~components/Typo/index'
import Header from '~components/Header/index'

export default function FamilyCodeSection() {
  const handleClickPrev = () => {}
  return (
    <>
      <Header type='sm' onClickPrev={handleClickPrev} prevBtn />
      <S.FamilyCodeSection>
        <S.PrevBtnWrapper>
          <PrevButton />
        </S.PrevBtnWrapper>
        <S.InputArea>
          <S.TypoWrapper>
            <Typo24 $weight='700'>
              가족에게 받은
              <br />
              코드를 입력해 주세요.
            </Typo24>
          </S.TypoWrapper>
          <S.FamilyCodeInput type='text' placeholder='가족코드 입력' />
        </S.InputArea>
        <ActionButton>다음</ActionButton>
      </S.FamilyCodeSection>
    </>
  )
}
