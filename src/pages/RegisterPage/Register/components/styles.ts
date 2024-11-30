import styled from 'styled-components'
import { Dialog, Radio, FormControlLabel } from '@mui/material'

export const DialogContainer = styled(Dialog)`
  .MuiDialog-paper {
    position: absolute;
    bottom: 0;
    margin: 0;
    width: 100%;
    max-width: 500px;
    border-radius: 8px 8px 0 0;
  }
`

export const DialogTitle = styled.h2`
  margin: 0;
  padding: 20px 20px 10px;
  font-size: 20px;
  font-weight: 500;
`

export const StyledFormControlLabel = styled(FormControlLabel)`
  margin: 0;
  padding: 12px 20px;
`

export const StyledRadio = styled(Radio)`
  &.MuiRadio-root {
    color: #673ab7;
    &.Mui-checked {
      color: #673ab7;
    }
  }
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  gap: 8px;
`

export const StyledButton = styled.button`
  background: none;
  border: none;
  color: #673ab7;
  font-weight: 500;
  padding: 8px 16px;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    background: rgba(103, 58, 183, 0.04);
  }
`
