import { SettingsStoreKey } from '@stores/settingsStore'

export const SETTINGS_INFO: Record<SettingsStoreKey, { title: string; desc: string }> = {
  allNotifications: {
    title: '모든 알림',
    desc: '',
  },
  friendRequests: {
    title: '친구 신청',
    desc: '부연 설명이 들어가는 공간',
  },
  familyWalkNotifications: {
    title: '가족 산책 알림',
    desc: '부연 설명이 들어가는 공간',
  },
  myWalkNotifications: {
    title: '내 산책 알림',
    desc: '부연 설명이 들어가는 공간',
  },
  messages: {
    title: '메세지',
    desc: '부연 설명이 들어가는 공간',
  },
  gangbuntta: {
    title: '강번따 허용 여부',
    desc: '부연 설명이 들어가는 공간',
  },
}
