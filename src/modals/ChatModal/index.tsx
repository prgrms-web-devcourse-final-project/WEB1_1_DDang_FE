import { HiEllipsisVertical } from 'react-icons/hi2'
import Header from '~components/Header'
import { IncomingMessage, OutgoingMessage } from '~components/Message'
import { Profile } from '~components/Profile'
import SendMessageForm from '~components/SendMessageForm'
import { Separator } from '~components/Separator'
import { Typo11, Typo15 } from '~components/Typo'
import { useModalStore } from '~stores/modalStore'
import * as S from './styles'

type ChatModalProps = {
  userId: string
}

export default function ChatModal({ userId }: ChatModalProps) {
  const { popModal } = useModalStore()
  console.log('ChatModal', userId) //todo fetch by userId

  return (
    <S.ChatModal>
      <Header type='lg' prevBtn onClickPrev={popModal}>
        <S.ProfileWrapper>
          <Profile $size={40} $src='empty' />
          <S.TypoWrapper>
            <Typo15 $weight='700'>감자탕수육</Typo15>
            <S.DetailWrapper>
              <Typo11 $color='font_2'>남자</Typo11>
              <Separator $height={8} />
              <Typo11 $color='font_2'>할아버지</Typo11>
            </S.DetailWrapper>
          </S.TypoWrapper>
        </S.ProfileWrapper>
        <S.EllipsisWrapper>
          <HiEllipsisVertical size={28} />
        </S.EllipsisWrapper>
      </Header>

      {chatDummyData.map(chat =>
        chat.sender === '김민준' ? (
          <OutgoingMessage key={chat.id}>{chat.message}</OutgoingMessage>
        ) : (
          <IncomingMessage key={chat.id}>{chat.message}</IncomingMessage>
        )
      )}

      <SendMessageForm />
    </S.ChatModal>
  )
}

const chatDummyData = [
  {
    id: 0,
    sender: '김민준',
    receiver: '이서연',
    message: '안녕하세요! 지난번 회의 자료 보내주실 수 있나요?',
    timestamp: '2024-11-15T09:30:01.936376',
    isRead: true,
  },
  {
    id: 1,
    sender: '이서연',
    receiver: '김민준',
    message: '네! 잠시만 기다려주세요. 바로 찾아보겠습니다.',
    timestamp: '2024-11-15T09:31:01.936400',
    isRead: true,
  },
  {
    id: 2,
    sender: '이서연',
    receiver: '김민준',
    message: '[회의자료.pdf] 첨부파일 보내드립니다!',
    timestamp: '2024-11-15T09:33:01.936409',
    isRead: true,
  },
  {
    id: 3,
    sender: '김민준',
    receiver: '이서연',
    message: '감사합니다 😊',
    timestamp: '2024-11-15T09:34:01.936416',
    isRead: true,
  },
  {
    id: 4,
    sender: '김민준',
    receiver: '이서연',
    message: '그런데 이번 프로젝트 일정이 어떻게 되나요?',
    timestamp: '2024-11-15T09:35:01.936423',
    isRead: true,
  },
  {
    id: 5,
    sender: '이서연',
    receiver: '김민준',
    message: '다음 주 월요일부터 시작이에요!',
    timestamp: '2024-11-15T09:36:01.936430',
    isRead: true,
  },
  {
    id: 6,
    sender: '김민준',
    receiver: '이서연',
    message: '알겠습니다. 혹시 킥오프 미팅은 몇 시인가요?',
    timestamp: '2024-11-15T09:37:01.936438',
    isRead: true,
  },
  {
    id: 7,
    sender: '이서연',
    receiver: '김민준',
    message: '오전 10시에 회의실 3번에서 진행됩니다.',
    timestamp: '2024-11-15T09:38:01.936445',
    isRead: true,
  },
  {
    id: 8,
    sender: '김민준',
    receiver: '이서연',
    message: '네, 참석하겠습니다!',
    timestamp: '2024-11-15T09:39:01.936452',
    isRead: true,
  },
  {
    id: 9,
    sender: '이서연',
    receiver: '김민준',
    message: '그리고 팀원 명단도 보내드릴게요.',
    timestamp: '2024-11-15T09:40:01.936458',
    isRead: true,
  },
  {
    id: 10,
    sender: '이서연',
    receiver: '김민준',
    message: '[팀원명단.xlsx] 여기 있습니다!',
    timestamp: '2024-11-15T09:41:01.936465',
    isRead: true,
  },
  {
    id: 11,
    sender: '김민준',
    receiver: '이서연',
    message: '혹시 사전 준비해야 할 사항이 있을까요?',
    timestamp: '2024-11-15T09:42:01.936471',
    isRead: true,
  },
  {
    id: 12,
    sender: '이서연',
    receiver: '김민준',
    message: '간단한 자기소개만 준비해 오시면 됩니다!',
    timestamp: '2024-11-15T09:43:01.936478',
    isRead: true,
  },
  {
    id: 13,
    sender: '김민준',
    receiver: '이서연',
    message: '알겠습니다. 점심 식사는 어떻게 하나요?',
    timestamp: '2024-11-15T09:44:01.936485',
    isRead: true,
  },
  {
    id: 14,
    sender: '이서연',
    receiver: '김민준',
    message: '회사에서 도시락을 준비한다고 합니다.',
    timestamp: '2024-11-15T09:45:01.936491',
    isRead: true,
  },
  {
    id: 15,
    sender: '김민준',
    receiver: '이서연',
    message: '아, 그렇군요. 좋네요 👍',
    timestamp: '2024-11-15T09:46:01.936497',
    isRead: false,
  },
  {
    id: 16,
    sender: '이서연',
    receiver: '김민준',
    message: '혹시 음료 선호도 있으신가요?',
    timestamp: '2024-11-15T09:47:01.936504',
    isRead: false,
  },
  {
    id: 17,
    sender: '김민준',
    receiver: '이서연',
    message: '아메리카노 좋아합니다!',
    timestamp: '2024-11-15T09:48:01.936511',
    isRead: false,
  },
  {
    id: 18,
    sender: '이서연',
    receiver: '김민준',
    message: '네, 참고하겠습니다 😊',
    timestamp: '2024-11-15T09:49:01.936517',
    isRead: false,
  },
  {
    id: 19,
    sender: '김민준',
    receiver: '이서연',
    message: '회의실에 프로젝터 있나요?',
    timestamp: '2024-11-15T09:50:01.936523',
    isRead: false,
  },
  {
    id: 20,
    sender: '이서연',
    receiver: '김민준',
    message: '네, 프로젝터랑 화이트보드 모두 구비되어 있습니다.',
    timestamp: '2024-11-15T09:51:01.936530',
    isRead: false,
  },
  {
    id: 21,
    sender: '김민준',
    receiver: '이서연',
    message: '노트북은 개인이 준비하면 되나요?',
    timestamp: '2024-11-15T09:52:01.936536',
    isRead: false,
  },
  {
    id: 22,
    sender: '이서연',
    receiver: '김민준',
    message: '네, 개인 노트북 지참해 주세요!',
    timestamp: '2024-11-15T09:53:01.936542',
    isRead: false,
  },
  {
    id: 23,
    sender: '김민준',
    receiver: '이서연',
    message: '와이파이 비밀번호는 어떻게 되나요?',
    timestamp: '2024-11-15T09:54:01.936549',
    isRead: false,
  },
  {
    id: 24,
    sender: '이서연',
    receiver: '김민준',
    message: '당일 회의실에 비치해두겠습니다.',
    timestamp: '2024-11-15T09:55:01.936555',
    isRead: false,
  },
  {
    id: 25,
    sender: '김민준',
    receiver: '이서연',
    message: '알겠습니다. 다른 준비사항 있으면 알려주세요!',
    timestamp: '2024-11-15T09:56:01.936562',
    isRead: false,
  },
  {
    id: 26,
    sender: '이서연',
    receiver: '김민준',
    message: '네, 추가 사항 있으면 다시 연락드리겠습니다.',
    timestamp: '2024-11-15T09:57:01.936569',
    isRead: false,
  },
  {
    id: 27,
    sender: '김민준',
    receiver: '이서연',
    message: '감사합니다. 좋은 하루 보내세요!',
    timestamp: '2024-11-15T09:58:01.936575',
    isRead: false,
  },
  {
    id: 28,
    sender: '이서연',
    receiver: '김민준',
    message: '네, 과장님도 좋은 하루 되세요 😊',
    timestamp: '2024-11-15T09:59:01.936582',
    isRead: false,
  },
  {
    id: 29,
    sender: '김민준',
    receiver: '이서연',
    message: '월요일에 뵙겠습니다!',
    timestamp: '2024-11-15T10:00:01.936589',
    isRead: false,
  },
]
