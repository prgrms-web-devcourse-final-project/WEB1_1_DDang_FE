import * as S from './styles'
import { useState, useEffect } from 'react'
import breeds from '~/data/breeds.json'
import { useModalStore } from '~/stores/modalStore'
import { DogProfileType } from '~types/dogProfile'

interface SearchModalProps {
  setDogProfile: (update: Partial<DogProfileType>) => void
}

export default function SearchModal({ setDogProfile }: SearchModalProps) {
  const { popModal } = useModalStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<string[]>([])

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults(breeds.breeds.sort((a, b) => a.localeCompare(b)))
      return
    }

    const filteredResults = breeds.breeds
      .filter(breed => breed.includes(searchTerm))
      .sort((a, b) => (!a.startsWith(searchTerm) && b.startsWith(searchTerm) ? 1 : -1))
    setSearchResults(filteredResults)
  }, [searchTerm])

  const handleClickSearchArea = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
  }

  const highlightText = (text: string) => {
    if (!searchTerm) return text

    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'))
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? <S.Highlight key={index}>{part}</S.Highlight> : part
    )
  }

  const handleBreedClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (target.closest('[data-breed]')) {
      const breed = target.closest('[data-breed]')?.getAttribute('data-breed')
      if (breed) setDogProfile({ breed })
      popModal()
    }
  }

  return (
    <S.SearchModalOverlay onClick={popModal}>
      <S.SearchArea onClick={handleClickSearchArea}>
        <S.SearchInput
          placeholder='견종을 검색하세요'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          autoFocus
        />
        <S.SearchResultsWrapper onClick={handleBreedClick}>
          {searchResults.map((result, index) => (
            <S.SearchResult key={index} data-breed={result}>
              {highlightText(result)}
            </S.SearchResult>
          ))}
          <S.SearchResult data-breed='믹스견'>믹스견</S.SearchResult>
          <S.SearchResult data-breed='기타'>기타</S.SearchResult>
        </S.SearchResultsWrapper>
      </S.SearchArea>
    </S.SearchModalOverlay>
  )
}
