import { FAMILY_ROLE } from '~constants/familyRole'

export type Gender = 'MALE' | 'FEMALE'
export type FamilyRole = keyof typeof FAMILY_ROLE
export type DayOfWeek = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY'
export type NotificationType = 'WALK' | 'CHAT' | 'FRIEND'
export type Provider = 'GOOGLE' | 'NAVER' | 'KAKAO'
export type ChatType = 'TALK' | 'SYSTEM'
export type BooleanString = 'TRUE' | 'FALSE'
export type Time = {
  /** 시간 @example 1 */
  hours: number
  /** 분 @example 30 */
  minutes: number
  /** 초 @example 45 */
  seconds: number
}
