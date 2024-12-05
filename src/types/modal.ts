export type BaseModalProps = {
  onClose: () => void
  onConfirm: () => void
  onCancel?: () => void
}

export type RequestUserInfo = {
  name: string
  breed: string
  age: number
  gender: string
  profileImg?: string
  email?: string
  comment?: string
}

export type OtherUserInfo = {
  name: string
  location?: string
  time?: string
}

export type ModalContentType = {
  [key: string]: {
    title?: string
    message?: string
    confirmText: string
    cancelText?: string
  }
}

export interface RequestModalProps extends BaseModalProps {
  type: 'request' | 'accept' | 'walkRequest'
  userInfo: RequestUserInfo
}

export interface OtherModalProps extends BaseModalProps {
  type: 'complete' | 'progress' | 'friend'
  userInfo: OtherUserInfo
}

export interface ReportModalProps extends BaseModalProps {
  type: 'report'
  userInfo: OtherUserInfo
}

export interface ReportCompleteModalProps extends BaseModalProps {
  type: 'reportComplete'
  userInfo: OtherUserInfo
}

export type WalkModalProps = RequestModalProps | OtherModalProps | ReportModalProps | ReportCompleteModalProps
