import styled from 'styled-components'
import { Dialog, Radio, FormControlLabel } from '@mui/material'
import { FOOTER_HEIGHT } from '~constants/layout'
export const DialogContainer = styled(Dialog)`
  .MuiDialog-paper {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    width: 100%;
    border-radius: 2.25rem 2.25rem 0 0;
    animation: slideUp 0.3s ease-out forwards;
    max-height: calc(100dvh - ${FOOTER_HEIGHT});
    overflow-y: auto;
  }

  @keyframes slideUp {
    from {
      transform: translate(-50%, 100%);
      opacity: 0;
    }
    to {
      transform: translate(-50%, 0);
      opacity: 1;
    }
  }
`

export const DialogTitle = styled.h2`
  margin: 0.5rem;
  padding: 1.25rem 1.25rem 0.625rem;
  font-size: 1.5rem;
  font-weight: 500;
`

export const StyledFormControlLabel = styled(FormControlLabel)`
  padding: 0.75rem 1.25rem;
  .MuiFormControlLabel-label {
    font-weight: 500;
    font-size: ${({ theme }) => theme.typography._17};
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1.25rem;
  gap: 0.5rem;
`
export const StyledRadio = styled(Radio)`
  &.MuiRadio-root {
    color: ${({ theme }) => theme.colors.brand.default};

    &.Mui-checked {
      color: ${({ theme }) => theme.colors.brand.default};

      .MuiSvgIcon-root {
        transform: scale(1.2);
        transition: transform 0.2s ease-in-out;
      }
    }
  }
`
export const RadioGroupContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 0.5rem;
`
