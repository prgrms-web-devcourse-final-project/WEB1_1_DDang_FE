import styled from 'styled-components'

export const Tag = styled.span`
    border: solid 2px ${({theme}) => theme.colors.grayscale.gc_1};
    padding: 6px 12px;
    border-radius: 30px; 
    width: fit-content;
    height: 32px;
    font-size: 14px;

    display: flex;
    justify-content: center;
    align-items : center;
`