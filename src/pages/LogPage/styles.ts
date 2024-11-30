import { styled } from 'styled-components'

export const LogPage = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 10px;
  height: 100%;
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
  flex: 1;
  margin-top: 20px;
  padding: 0 20px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const NoWalkSummary = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 13px;
  font-size: 20px;
  font-weight: 500;
  color: #c6c6c6;

  p {
    text-align: center;
  }
`
