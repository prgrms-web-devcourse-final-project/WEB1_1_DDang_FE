import styled from 'styled-components'

export const Calendar = styled.div`
  background-color: ${props => props.theme.colors.grayscale.gc_4};
  width: 100%;
  overflow: hidden;
  padding-top: 8px;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  position: relative;

  &::after {
    content: '';
    background-color: ${props => props.theme.colors.grayscale.gc_1};
    position: absolute;
    width: 32px;
    height: 4px;
    left: 50%;
    bottom: 8px;
    transform: translateX(-50%);
  }
`

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  font-size: 20px;
  font-weight: 500;
`

export const DatePickerOpenBtn = styled.button`
  background-color: ${props => props.theme.colors.brand.lighten_3};
  border-radius: 50%;
  width: 20px;
  height: 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`

export const CalendarBody = styled.div`
  cursor: grab;
  padding: 10px 24px 24px 24px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`

export const DayOfWeek = styled.div`
  font-size: 14px;
  color: ${props => props.theme.colors.grayscale.font_3};
  aspect-ratio: 1 /1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
`

export const Week = styled.div`
  display: contents;
`

export const Date = styled.button<{ $isActive: boolean }>`
  font-size: 16px;
  aspect-ratio: 1/ 1;
  font-weight: 500;
  border-radius: 40%;

  background-color: ${props => (props.$isActive ? props.theme.colors.brand.sub : props.theme.colors.grayscale.gc_4)};
  color: ${props => (props.$isActive ? props.theme.colors.grayscale.gc_4 : props.theme.colors.grayscale.font_1)};

  &:disabled {
    color: ${props => props.theme.colors.grayscale.font_4};
    cursor: default;
  }
`
