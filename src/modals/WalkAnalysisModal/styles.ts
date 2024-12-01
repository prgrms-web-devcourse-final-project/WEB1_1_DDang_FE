import styled from 'styled-components'

export const WalkAnalysisModal = styled.div`
  background-color: ${props => props.theme.colors.brand.lighten_3};
  height: 100%;
  padding: 56px 20px 40px 20px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`

export const Header = styled.header`
  position: fixed;
  background-color: ${props => props.theme.colors.brand.lighten_3};
  width: 100%;
  height: 56px;
  padding: 0 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const PrevBtn = styled.img`
  position: absolute;
  left: 20px;
  width: 28px;
  height: 28px;
  cursor: pointer;
`

export const Title = styled.h2`
  font-size: 17px;
  font-weight: 500;
`

export const ChartArea = styled.div`
  margin-top: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`

export const ChartWrapper = styled.div`
  background-color: ${props => props.theme.colors.grayscale.gc_4};
  height: 318px;
  border-radius: 12px;
  padding: 20px 24px;
`

export const ChartTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
`

export const Chart = styled.svg`
  overflow: visible;
`

export const StatisticsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
`

export const Statistics = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  height: 136px;
  background-color: ${props => props.theme.colors.grayscale.gc_4};
  border-radius: 12px;
  padding: 20px 24px;

  h3 {
    font-size: 15px;
    font-weight: 500;
  }

  strong {
    font-size: 20px;
    font-weight: 900;
  }

  > div {
    display: flex;
    justify-content: space-between;
  }
`
