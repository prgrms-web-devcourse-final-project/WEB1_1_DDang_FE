import { AnimatePresence } from 'framer-motion'
import { Typo15 } from '~components/Typo'
import { usePushNotificationStore } from '~stores/usePushNotificationStore'
import * as S from './styles'

export default function PushNotification() {
  const { notifications, clearNotification } = usePushNotificationStore()

  return (
    <AnimatePresence>
      {notifications.map(({ id, message }) => (
        <S.PushNotification
          key={id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => clearNotification()}
        >
          <Typo15 $weight='700' $color='default'>
            {message}
          </Typo15>
        </S.PushNotification>
      ))}
    </AnimatePresence>
  )
}
