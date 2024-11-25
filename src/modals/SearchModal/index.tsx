import * as S from './styles'

export default function SearchModal() {
  const handleOverlay = () => {
    console.log('바깥 클릭')
  }

  const handleClickSearchArea = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }
  return (
    <S.SearchModalOverlay onClick={handleOverlay}>
      <S.SearchArea onClick={handleClickSearchArea}>
        <S.SearchInput placeholder='견종을 검색하세요' />
      </S.SearchArea>
    </S.SearchModalOverlay>
  )
}
