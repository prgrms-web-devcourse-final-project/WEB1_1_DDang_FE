import { motion } from 'framer-motion'
import { styled } from 'styled-components'

export const PushNotification = styled(motion.div)`
  position: fixed;
  left: 50%;
  top: 10px;
  background-color: ${({ theme }) => theme.colors.grayscale.gc_4};
  padding: 12px 20px;
  translate: -50%;
  border-radius: 12px;
  width: 90%;
`
