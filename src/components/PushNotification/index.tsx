import { AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { Typo15 } from '~components/Typo'
import { usePushNotificationStore } from '~stores/usePushNotificationStore'
import * as S from './styles'

export default function PushNotification() {
  const { pushNotification, hideNotification } = usePushNotificationStore()
  console.log(pushNotification)

  return createPortal(
    <AnimatePresence>
      {pushNotification && (
        <S.PushNotification
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => hideNotification}
        >
          <Typo15>{pushNotification}</Typo15>
        </S.PushNotification>
      )}
    </AnimatePresence>,
    document.getElementById('root')!.querySelector('div')!
  )
}
