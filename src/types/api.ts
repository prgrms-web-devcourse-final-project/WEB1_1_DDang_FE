import { ChatType, Gender, FamilyRole, DayOfWeek, Provider, BooleanString } from '~types/common'

export type APIResponse<T> = {
  code: number
  status: string
  message: string
  data: T
}

export type ErrorResponse = APIResponse<null>

export type Dog = {
  /** 강아지 ID @example 1 */
  dogId: number
  /** 강아지 이름 @example "멍멍이" */
  name: string
  /** 강아지 품종 @example "골든 리트리버" */
  breed: string
  /** 강아지 생년월일 @example "2020-03-15" */
  birthDate: string
  /** 강아지 체중 (kg) @example 25 */
  weight: number
  /** 강아지 성별 @example "MALE" */
  gender: Gender
  /** 강아지 프로필 이미지 URL @example "https://example.com/dog_profile.jpg" */
  profileImg: string
  /** 중성화 여부 @example "TRUE" */
  isNeutered: BooleanString
  /** 가족 ID @example 1 */
  familyId: number
  /** 강아지 코멘트 @example "활발하고 친근한 성격입니다." */
  comment: string
  /** 강아지 프로필 이미지 URL (중복) @example "https://example.com/dog_profile.jpg" */
  dogProfileImg: string
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

export type Time = {
  /** 시간 @example 1 */
  hours: number
  /** 분 @example 30 */
  minutes: number
  /** 초 @example 45 */
  seconds: number
}

export type Member = {
  /** 유저 ID @example 1 */
  memberId: number
  /** 이메일 주소 @example "user@example.com" */
  email: string
  /** 이름 @example "홍길동" */
  name: string
  /** 로그인 제공자 @example "GOOGLE" */
  provider: Provider
  /** 생년월일 @example "1990-01-01" */
  birthDate: string
  /** 성별 @example "MALE" */
  gender: Gender
  /** 주소 @example "서울시 강남구" */
  address: string
  /** 가족 내 역할 @example "FATHER" */
  familyRole: FamilyRole
  /** 프로필 이미지 URL @example "https://example.com/profile.jpg" */
  profileImg: string
}

export type Position = {
  /** 위도 @example 37.5665 */
  latitude: number
  /** 경도 @example 126.9780 */
  longitude: number
  /** 타임스탬프 @example "2024-12-03T08:23:14.753Z" */
  timeStamp: string
}

export type CommonAPIRequest = {
  /** 사용자 이메일 주소 @example "user@example.com" */
  email: string
  /** 로그인 제공자 @example "NAVER" */
  provider: Provider
  /** 사용자 이름 @example "홍길동" */
  name: string
  /** 생년월일 @example "1990-01-01" */
  birthDate: string
  /** 성별 @example "MALE" */
  gender: Gender
  /** 주소 @example "서울시 강남구" */
  address: string
  /** 가족 내 역할 @example "FATHER" */
  familyRole: FamilyRole
  /** 프로필 이미지 URL @example "https://example.com/profile.jpg" */
  profileImg: string
  /** 채팅방 ID @example 3 */
  chatRoomId: number
  /** 메시지 내용 @example "안녕하세요!" */
  message: string
  /** 읽은 메시지 ID 목록 @example null */
  readMessageIds: null
  /** 총 산책 거리 (미터) @example 1200 */
  totalDistanceMeter: number
  /** 총 산책 시간 (초) @example 1800 */
  totalWalkTimeSecond: number
  /** 강아지 품종 @example "골든 리트리버" */
  breed: string
  /** 강아지 체중 (kg) @example 25 */
  weight: number
  /** 중성화 여부 @example "TRUE" */
  isNeutered: BooleanString
  /** 가족 ID @example 1 */
  familyId: number
  /** 코멘트 @example "반갑습니다!" */
  comment: string
}

export type CommonAPIResponse = {
  //* 강아지
  /** 강아지 정보 */
  dog: Dog
  /** 강아지 목록 */
  dogs: Dog[]
  /** 강아지 산책 횟수 @example 10 */
  dogWalkCount: number
  /** 강아지 나이 @example 3 */
  dogAge: number
  /** 강아지 성별 @example "MALE" */
  dogGender: Gender
  /** 강아지 품종 @example "골든 리트리버" */
  dogBreed: string
  /** 강아지 체중 (kg) @example 25 */
  dogWeight: number

  //* 강번따
  /** 함께 산책한 다른 강아지 정보 */
  walkWithDogInfo: OtherDog

  //* 산책
  /** 산책 시간 정보 */
  timeDuration: Time
  /** 산책 일정 ID @example 1 */
  walkScheduleId: number
  /** 요일 @example "MON" */
  dayOfWeek: DayOfWeek
  /** 산책 시간 @example "09:30" */
  walkTime: string
  /** 유저 이름 @example "홍길동" */
  memberName: string
  /** 강아지 이름 @example "멍멍이" */
  dogName: string
  /** 가족 ID @example 101 */
  familyId: number
  /** 유저 ID @example 1 */
  memberId: number
  /** 가족 내 역할 @example "FATHER" */
  familyRole: FamilyRole
  /** 카운트 @example 10 */
  count: number
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

  //* 유저
  /** 유저 정보 */
  memberInfo: Pick<Member, 'memberId' | 'email' | 'name'>
  /** 유저 목록 */
  members: Member[]
  /** 이름 @example "홍길동" */
  name: string
  /** 주소 @example "서울시 강남구" */
  address: string
  /** 프로필 이미지 URL @example "https://example.com/profile.jpg" */
  profileImg: string
  /** 매칭 여부 @example "TRUE" */
  isMatched: BooleanString
  /** 유저 성별 @example "MALE" */
  memberGender: Gender
  /** 유저 프로필 이미지 URL @example "https://example.com/profile.jpg" */
  memberProfileImg: string
  /** 성별 @example "MALE" */
  gender: Gender

  //* 위치
  /**
   * ! 위치 @example "[{lat: 37.5665, lng: 126.9780}]"
   * */
  points: string
  /** 위도 @example 37.5665 */
  latitude: number
  /** 경도 @example 126.9780 */
  longitude: number
  /** 위치 목록 */
  positionList: Position[]
  /** 유저 이메일 @example "user@example.com" */
  memberEmail: string
  /** 이메일 @example "user@example.com" */
  email: string

  //* 채팅
  /** 채팅 ID @example 123 */
  chatId: number
  /** 생성 시간 @example "2024-12-03T08:17:04.717Z" */
  createdAt: string
  /** 업데이트 시간 @example "2024-12-03T08:17:04.717Z" */
  updatedAt: string
  /** 채팅방 ID @example 1 */
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
  /** 가족 이름 @example "행복한 가족" */
  familyName: string
  /** 초대 코드 @example "ABC12345" */
  inviteCode: string
  /** 초대 코드 만료 시간 (초) @example 300 */
  expiresInSeconds: number
  /** 로그인 제공자 @example "GOOGLE" */
  provider: Provider
}
