import * as S from './styles'
import { useModalStore } from '~stores/modalStore'

export default function ModalContainer() {
  const { modalList } = useModalStore()

  return <>{modalList.length ? <S.ModalWrapper>{...modalList}</S.ModalWrapper> : null}</>
}
