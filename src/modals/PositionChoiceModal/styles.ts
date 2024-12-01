import styled from 'styled-components'
import { Dialog, Radio, FormControlLabel } from '@mui/material'

export const DialogContainer = styled(Dialog)`
  .MuiDialog-paper {
    position: absolute;
    bottom: 0;
    margin: 0;
    width: 100%;
    min-width: 340px;
    max-width: 430px;
    border-radius: 36px 36px 0px 0px;
    animation: slideUp 0.3s ease-out forwards;
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`

export const DialogTitle = styled.h2`
  margin: 0;
  padding: 20px 20px 10px;
  font-size: ${({ theme }) => theme.typography._24};
  font-weight: 500;
`

export const StyledFormControlLabel = styled(FormControlLabel)`
  padding: 12px 20px;
  .MuiFormControlLabel-label {
    font-weight: 500;
    font-size: ${({ theme }) => theme.typography._17};
  }
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

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  gap: 8px;
`
