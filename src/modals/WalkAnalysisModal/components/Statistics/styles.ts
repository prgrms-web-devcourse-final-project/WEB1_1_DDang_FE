import styled from 'styled-components'

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
