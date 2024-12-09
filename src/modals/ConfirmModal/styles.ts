import styled from 'styled-components'

export const ConfirmModalOverlay = styled.div`
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-content: center;
`

export const ConfirmModal = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  width: 260px;
  height: 180px;
  background-color: ${props => props.theme.colors.grayscale.gc_4};
  padding: 20px 24px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
`

export const ConfirmButton = styled.button`
  border-radius: 24px;
  width: 90px;
  height: 50px;
  background-color: ${props => props.theme.colors.brand.darken};
  color: ${props => props.theme.colors.grayscale.gc_4};
`
