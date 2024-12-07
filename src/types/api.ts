import { ChatType, Gender, FamilyRole, DayOfWeek, Provider, BooleanString, Time, NotificationType } from '~types/common'

export type APIResponse<T> = {
  code: number
  status: string
  message: string
  data: T
}

export type ErrorResponse = APIResponse<null>

export type BasicInfo = {
  /** 이름 @example "홍길동" */
  name: string
  /** 생년월일 @example "1990-01-01" */
  birthDate: string
  /** 성별 @example "MALE" */
  gender: Gender
}

export type TimeStamp = {
  /** 생성 시간 @example "2024-12-03T08:17:04.717Z" */
  createdAt: string
  /** 업데이트 시간 @example "2024-12-03T08:17:04.717Z" */
  updatedAt: string
}

export type Dog = BasicInfo & {
  /** 강아지 ID @example 1 */
  dogId: number
  /** 강아지 품종 @example "골든 리트리버" */
  breed: string
  /** 강아지 체중 (kg) @example 25 */
  weight: number
  /** 강아지 프로필 이미지 URL @example "https://example.com/dog_profile.jpg" */
  profileImg: string
  /** 중성화 여부 @example "TRUE" */
  isNeutered: BooleanString
  /** 가족 ID @example 1 */
  familyId: number
  /** 코멘트 @example "활발하고 친근한 성격입니다." */
  comment: string
}

export type OtherDog = {
  /** 다른 강아지 ID @example 2 */
  otherDogId: number
  /** 다른 강아지 프로필 이미지 URL @example "https://example.com/other_dog_profile.jpg" */
  otherDogProfileImg: string
  /** 다른 강아지 이름 @example "초코" */
  otherDogName: string
  /** 다른 강아지 품종 @example "시고르브 잡종" */
  otherDogBreed: string
  /** 다른 강아지 나이 @example 3 */
  otherDogAge: number
  /** 다른 강아지 성별 @example "MALE" */
  otherDogGender: Gender
  /** 다른 강아지 주인의 유저 ID @example 2 */
  memberId: number
}

export type Member = BasicInfo & {
  /** 유저 ID @example 1 */
  memberId: number
  /** 이메일 주소 @example "user@example.com" */
  email: string
  /** 로그인 제공자 @example "GOOGLE" */
  provider: Provider
  /** 주소 @example "서울시 강남구" */
  address: string
  /** 가족 내 역할 @example "FATHER" */
  familyRole: FamilyRole
  /** 프로필 이미지 URL @example "https://example.com/profile.jpg" */
  profileImg: string
  memberProfileImgUrl: string
}

export type Position = {
  /** 위도 @example 37.5665 */
  latitude: number
  /** 경도 @example 126.9780 */
  longitude: number
  /** 타임스탬프 @example "2024-12-03T08:23:14.753Z" */
  timeStamp: string
}

export type Walk = {
  walkId: number
  walkImg: string
  /** 산책 시간 정보 */
  timeDuration: Time
  /** 산책 일정 ID @example 1 */
  walkScheduleId: number
  /** 요일 @example "MON" */
  dayOfWeek: DayOfWeek
  /** 산책 시간 @example "09:30" */
  walkTime: string
  /** 산책 횟수 @example 5 */
  walkCount: number
  /** 날짜 @example "2024-12-03" */
  date: string
  /** 총 산책 거리 (km) @example 12.5 */
  totalDistance: number
  /** 총 산책 거리 (km) @example 10 */
  totalDistanceKilo: number
  /** 총 소모 칼로리 @example 100 */
  totalCalorie: number
  /** 총 산책 거리 (m) @example 5000 */
  totalDistanceMeter: number
  /** 유저과 함께 산책한 횟수 @example 3 */
  countWalksWithMember: number
  /** 총 산책 횟수 @example 10 */
  totalWalkCount: number
  /** 총 산책 거리 (km) @example 5000 */
  totalDistanceInKilometers: number
}

export type Chat = TimeStamp & {
  /** 채팅 ID @example 123 */
  chatId: number
  /** 채팅방 ID @example 3 */
  chatRoomId: number
  /** 채팅 타입 @example "TALK" */
  chatType: ChatType
  /** 읽음 여부 @example "TRUE" */
  isRead: BooleanString
  /** 메시지 내용 @example "안녕하세요!" */
  text: string
  /** 마지막 메시지 @example "안녕하세요!" */
  lastMessage: string
  /** 읽은 메시지 ID 목록 @example null */
  readMessageIds: null
  /** 읽지 않은 메시지 수 @example 3 */
  unreadMessageCount: number
}

export type Family = {
  /** 가족 ID @example 1 */
  familyId: number
  /** 가족 이름 @example "행복한 가족" */
  familyName: string
  /** 초대 코드 @example "ABC12345" */
  inviteCode: string
  /** 초대 코드 만료 시간 (초) @example 300 */
  expiresInSeconds: number
}

export type CommonAPIRequest = Member &
  Dog &
  Chat & {
    /** 총 산책 시간 (초) @example 1800 */
    totalWalkTimeSecond: number
  }

export type Notification = TimeStamp & {
  notificationId: number
  type: NotificationType
  content: string
}

export type CommonAPIResponse = BasicInfo &
  Member &
  Chat &
  Family &
  Walk &
  Position &
  Dog &
  OtherDog &
  Notification & {
    dog: Dog
    dogs: Dog[]
    dogWalkCount: number
    dogAge: number
    walkWithDogInfo: OtherDog
    memberName: string
    dogName: string
    count: number
    memberInfo: Pick<Member, 'memberId' | 'email' | 'name'>
    members: Pick<Member, 'memberId' | 'email' | 'name' | 'gender' | 'familyRole' | 'profileImg'>[]
    isMatched: BooleanString
    memberGender: Gender
    memberProfileImg: string
    points: string
    positionList: Position[]
    memberEmail: string
  }

//* Pagination 관련
export type SortInfo = {
  empty: boolean
  sorted: boolean
  unsorted: boolean
}

export type PageableInfo = {
  offset: number
  sort: SortInfo
  pageSize: number
  paged: boolean
  pageNumber: number
  unpaged: boolean
}

export type PaginationResponse = {
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
  sort: SortInfo
  pageable: PageableInfo
}

export type Setting = {
  notificationSettingsId: number
  memberId: number
  type: NotificationType
  isAgreed: BooleanString
}
