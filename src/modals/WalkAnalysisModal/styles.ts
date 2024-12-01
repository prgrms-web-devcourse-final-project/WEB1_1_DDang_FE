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
  border: solid 1px red;
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

export const LineChart = styled.div`
  border: solid 1px red;
`

export const BarChartWrapper = styled.div`
  background-color: ${props => props.theme.colors.grayscale.gc_4};
  height: 318px;
  border-radius: 12px;
  padding: 20px 24px;
`

export const BarChartTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
`

export const BarChart = styled.svg`
  width: 100%;
`

export const Bar = styled.rect`
  width: 60px;
  background-color: ${props => props.theme.colors.brand.lighten_1};
`
