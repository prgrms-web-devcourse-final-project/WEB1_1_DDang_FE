import { styled } from 'styled-components'

export const CheckDogProfileSection = styled.div`
    padding : 0 20px 24px 20px;
    background-color: ${({theme}) => theme.colors.grayscale.gc_4};
    height: 100dvh;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`


export const InputArea = styled.div`
   
    /* display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    transform: translateY(-50px); */
`

export const TypoWrapper = styled.div`
    margin-top: 200px;
    text-align: center;
`