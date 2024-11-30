import { styled } from 'styled-components'

export const LogPage = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 10px;
`

export const DogName = styled.p`
  font-weight: bold;
  margin-left: 10px;
`

export const GraphImage = styled.img`
  margin-left: auto;
  cursor: pointer;
`

export const CalendarWrapper = styled.div`
  margin-top: 56px;
`

export const WalkSummaryWrapper = styled.div`
  margin-top: 20px;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`
