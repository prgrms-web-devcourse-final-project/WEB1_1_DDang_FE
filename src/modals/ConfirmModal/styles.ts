import styled from 'styled-components'

export const ConfirmModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background-color: (0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-content: center;
`

export const ConfirmModal = styled.div`
  width: 300px;
  height: 200px;
  background-color: ${props => props.theme.colors.grayscale.gc_4};

  display: flex;
  flex-direction: column;
  gap: 30px;

  font-size: 20px;
  font-weight: 700;
`

export const ConfirmButton = styled.button`
  border-radius: 30px;
  width: 80px;
  height: 50px;
  background-color: ${props => props.theme.colors.brand.darken};
  color: ${props => props.theme.colors.grayscale.gc_4};
`
