import NotificationItem from '~components/NotificationItem'
import * as S from './styles'

const notificationList = [
  {
    content: '엄마 산책 시켜주세요!',
    date: new Date('2024-11-21 09:38:04'),
  },
  {
    content: '오늘 빼먹지 말고 산책!',
    date: new Date('2024-11-21 07:13:04'),
  },
  {
    content: '다 함께 즐거운 순간!',
    date: new Date('2024-11-21 01:32:04'),
  },
  {
    content: '오늘 빼먹지 말고 산책!',
    date: new Date('2024-11-21 11:51:04'),
  },
  {
    content: '다 함께 즐거운 순간!',
    date: new Date('2024-11-21 06:26:04'),
  },
  {
    content: '오늘 빼먹지 말고 산책!',
    date: new Date('2024-11-21 18:00:04'),
  },
  {
    content: '오늘 빼먹지 말고 산책!',
    date: new Date('2024-11-21 04:24:04'),
  },
  {
    content: '오늘의 미션을 완료했어요!',
    date: new Date('2024-11-21 16:10:04'),
  },
  {
    content: '내일 날씨가 좋으면 산책해요!',
    date: new Date('2024-11-21 13:44:04'),
  },
  {
    content: '엄마 산책 시켜주세요!',
    date: new Date('2024-11-21 18:35:04'),
  },
  {
    content: '다 함께 즐거운 순간!',
    date: new Date('2024-11-21 20:32:04'),
  },
  {
    content: '내일 날씨가 좋으면 산책해요!',
    date: new Date('2024-11-21 20:29:04'),
  },
  {
    content: '이번 주 미션을 완료할 거예요!',
    date: new Date('2024-11-21 16:24:04'),
  },
  {
    content: '오늘 빼먹지 말고 산책!',
    date: new Date('2024-11-21 04:00:04'),
  },
  {
    content: '다 함께 즐거운 순간!',
    date: new Date('2024-11-21 20:15:04'),
  },
  {
    content: '오늘 기분이 어때요?',
    date: new Date('2024-11-21 13:07:04'),
  },
  {
    content: '엄마 나와 함께 놀아요!',
    date: new Date('2024-11-21 12:04:04'),
  },
  {
    content: '산책이 너무 좋아요!',
    date: new Date('2024-11-21 07:04:04'),
  },
  {
    content: '엄마 나와 함께 놀아요!',
    date: new Date('2024-11-21 07:22:04'),
  },
  {
    content: '오늘 기분이 어때요?',
    date: new Date('2024-11-21 09:32:04'),
  },
  {
    content: '오늘 빼먹지 말고 산책!',
    date: new Date('2024-11-21 14:29:04'),
  },
  {
    content: '엄마 나와 함께 놀아요!',
    date: new Date('2024-11-21 11:32:04'),
  },
  {
    content: '밥은 언제 먹어?',
    date: new Date('2024-11-21 23:44:04'),
  },
  {
    content: '내일 날씨가 좋으면 산책해요!',
    date: new Date('2024-11-21 01:33:04'),
  },
  {
    content: '다 함께 즐거운 순간!',
    date: new Date('2024-11-21 19:34:04'),
  },
  {
    content: '엄마 나와 함께 놀아요!',
    date: new Date('2024-11-21 13:40:04'),
  },
  {
    content: '이번 주 미션을 완료할 거예요!',
    date: new Date('2024-11-21 14:05:04'),
  },
  {
    content: '밥은 언제 먹어?',
    date: new Date('2024-11-21 01:02:04'),
  },
  {
    content: '이번 주 미션을 완료할 거예요!',
    date: new Date('2024-11-21 04:02:04'),
  },
  {
    content: '엄마 산책 시켜주세요!',
    date: new Date('2024-11-21 22:11:04'),
  },
]
export default function NotificationList() {
  return (
    <S.NotificationList>
      {notificationList.map((notification, index) => (
        <NotificationItem content={notification.content} date={notification.date} key={index} />
      ))}
    </S.NotificationList>
  )
}
