import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { AnimationType, useModalStore } from '~stores/modalStore'
import * as S from './styles'

const animationVariants = {
  none: {
    initial: {},
    animate: {},
    exit: {},
  },
  fade: {
    initial: { opacity: 0, height: '100%' },
    animate: { opacity: 1, height: '100%' },
    exit: { opacity: 0, height: '100%' },
  },
  slideUp: {
    initial: { y: '100%', height: '100%' },
    animate: { y: 0, height: '100%' },
    exit: { y: '100%', height: '100%' },
  },
  slideDown: {
    initial: { y: -'100%', height: '100%' },
    animate: { y: 0, height: '100%' },
    exit: { y: -'100%', height: '100%' },
  },
  slideLeft: {
    initial: { x: '100%', height: '100%' },
    animate: { x: 0, height: '100%' },
    exit: { x: '100%', height: '100%' },
  },
  slideRight: {
    initial: { x: -'100%', height: '100%' },
    animate: { x: 0, height: '100%' },
    exit: { x: -'100%', height: '100%' },
  },
}

const ModalAnimation = ({
  children,
  animationType,
  index,
}: {
  children: React.ReactNode
  animationType?: AnimationType
  index: number
}) => (
  <motion.div
    variants={animationVariants[animationType || 'fade']}
    initial='initial'
    animate='animate'
    exit='exit'
    transition={{
      type: 'tween',
      duration: 0.3,
      delay: index * 0.1, // 각 모달에 약간의 지연 추가
    }}
    style={{
      zIndex: 1000 + index, // 동적 z-index
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  >
    {children}
  </motion.div>
)

export default function ModalContainer() {
  const { modalList, popModal } = useModalStore()

  useEffect(() => {
    const preventBack = () => {
      window.history.pushState(null, '', window.location.href)
      popModal()
      return true
    }

    if (modalList.length > 0) {
      window.history.pushState(null, '', window.location.href)
      window.addEventListener('popstate', preventBack)
    }
    return () => window.removeEventListener('popstate', preventBack)
  }, [modalList])

  return (
    <AnimatePresence>
      {modalList.length > 0 && (
        <S.ModalWrapper>
          {modalList.map((modal, index) => (
            <ModalAnimation
              key={modal.id || index} // 고유한 key 사용
              animationType={modal.animationType}
              index={index}
            >
              {modal.content}
            </ModalAnimation>
          ))}
        </S.ModalWrapper>
      )}
    </AnimatePresence>
  )
}
