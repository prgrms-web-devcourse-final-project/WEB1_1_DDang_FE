import { motion } from 'framer-motion'
import { styled } from 'styled-components'

export const PushNotification = styled(motion.div)`
  position: fixed;
  left: 50%;
  top: 20px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  color: ${({ theme }) => theme.colors.grayscale.font_1};
  padding: 16px 36px;
  translate: -50%;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  line-height: 1.4;
  z-index: 1000;

  &::before {
    content: '';
    position: absolute;
    left: 18px;
    top: 50%;
    translate: 0 -50%;
    width: 3.5px;
    height: 20px;
    background-color: ${({ theme }) => theme.colors.brand.default};
    border-radius: 100px;
  }
`
