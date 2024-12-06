import { SetStateAction, useState, useEffect } from 'react'
import * as S from './styles'
import Select from '~components/Select'
import { WalkModalProps, RequestUserInfo, OtherUserInfo } from '~types/modal'
import { useWebSocket } from '~/WebSocketContext'

const reportOptions = [
  { value: 'dog', label: '강아지가 사나워요.' },
  { value: 'other', label: '기타' },
]

const WalkModal = ({ type, userInfo, onClose, onConfirm, onCancel }: WalkModalProps) => {
  const [message, setMessage] = useState('')
  const { publish, isConnected } = useWebSocket()

  const handleConfirm = () => {
    if (type === 'request') {
      const proposalData = {
        otherMemberId: userInfo.email,
        message,
      }
      publish('/pub/api/v1/proposal', proposalData)
      onClose()
    } else if (type === 'accept') {
      const decisionData = {
        otherEmail: (userInfo as RequestUserInfo).email,
        decision: 'ACCEPT',
      }
      publish('/pub/api/v1/decision', decisionData)
      onClose()
    } else {
      onConfirm()
    }
  }

  const handleCancel = () => {
    if (type === 'accept') {
      const decisionData = {
        otherEmail: (userInfo as RequestUserInfo).email,
        decision: 'DENY',
      }
      publish('/pub/api/v1/decision', decisionData)
      onClose()
    } else {
      onCancel?.()
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const [selectedReportType, setSelectedReportType] = useState('')
  const getModalContent = () => {
    switch (type) {
      case 'request':
        return {
          message: '함께 산책하기 위해 멘트를 입력하세요.',
          confirmText: '전송하기',
        }
      case 'accept':
        return {
          message: '산책 요청이 왔어요!',
          confirmText: '수락',
          cancelText: '거절',
        }
      case 'complete':
        return {
          message: '신고가 완료됐습니다.',
          confirmText: '확인',
        }
      case 'progress':
        return {
          title: '강번따 응답',
          message: `${userInfo.name}이(가) 거절했어요.`,
          confirmText: '다시 시도',
          cancelText: '취소',
        }
      case 'friend':
        return {
          message: `${userInfo.name}이 30분동안 산책했어요.`,
          confirmText: '수락',
          cancelText: '거절',
        }
      case 'report':
        return {
          title: '어떤 이유로 신고하시나요?',
          confirmText: '전달',
          cancelText: '취소',
        }
      case 'reportComplete':
        return {
          title: '신고 완료!',
          message: '신고가 완료됐습니다.',
          confirmText: '확인',
        }
      case 'walkRequest':
        return {
          title: '산책 친구하실래요?',
          confirmText: '수락',
          cancelText: '거절',
        }
    }
  }

  const modalContent = getModalContent()

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent type={type} onClick={e => e.stopPropagation()}>
        {(type === 'accept' || type === 'progress' || type === 'walkRequest') && (
          <>
            <h1>{type === 'progress' || type === 'walkRequest' ? modalContent?.title : modalContent?.message}</h1>
            {type === 'walkRequest' && <S.ReportIcon />}
          </>
        )}
        {type !== 'accept' && type === 'friend' && <div className='date'>2024.12.14</div>}

        {type !== 'progress' && type !== 'report' && type !== 'reportComplete' && (
          <>
            <S.UserInfo type={type}>
              <S.Avatar type={type} src={(userInfo as RequestUserInfo).profileImg} />
              <S.Info type={type}>
                <h3>{userInfo.name}</h3>
                {(type === 'request' || type === 'accept' || type === 'walkRequest') ?? (
                  <>
                    <p>
                      {(userInfo as RequestUserInfo).breed} <S.InfoSeparator $height={8} />{' '}
                      {(userInfo as RequestUserInfo).age} <S.InfoSeparator $height={8} />{' '}
                      {(userInfo as RequestUserInfo).gender}
                    </p>
                  </>
                )}
              </S.Info>
            </S.UserInfo>
            {type === 'accept' && <S.ProposalMessage>{(userInfo as RequestUserInfo).comment}</S.ProposalMessage>}
          </>
        )}

        {type === 'report' && (
          <>
            <h1>{modalContent?.title}</h1>
            <S.SelectWrapper>
              <Select
                options={reportOptions}
                value={selectedReportType}
                onChange={(value: SetStateAction<string>) => setSelectedReportType(value)}
                placeholder='신고 사유 선택'
              />
            </S.SelectWrapper>
          </>
        )}

        {type === 'request' ? (
          <S.Message as='textarea' type={type} className='message' placeholder={modalContent?.message} />
        ) : type === 'progress' ? (
          <S.Message type={type} className='message'>
            {modalContent?.message}
          </S.Message>
        ) : null}

        {type === 'reportComplete' && (
          <>
            <h1>{modalContent?.title}</h1>
            <S.Message type={type}>{modalContent?.message}</S.Message>
          </>
        )}

        <S.ButtonGroup type={type}>
          {modalContent?.cancelText && (
            <S.Button type={type} variant='cancel' onClick={handleCancel}>
              {modalContent.cancelText}
            </S.Button>
          )}
          <S.Button type={type} variant='confirm' onClick={handleConfirm}>
            {modalContent?.confirmText}
          </S.Button>
        </S.ButtonGroup>
      </S.ModalContent>
    </S.ModalOverlay>
  )
}

export default WalkModal
