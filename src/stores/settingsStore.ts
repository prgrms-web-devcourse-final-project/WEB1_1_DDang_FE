import { create } from 'zustand'
import { updateSetting } from '~apis/myPage/updateSetting'

type SettingValues = {
  allNotifications: boolean
  friendRequests: boolean
  familyWalkNotifications: boolean
  myWalkNotifications: boolean
  messages: boolean
  gangbuntta: boolean
}

type SettingsStore = {
  settings: SettingValues
  setSetting: (key: keyof SettingValues, value: boolean) => Promise<void>
}

export const useSettingsStore = create<SettingsStore>(set => ({
  settings: {
    allNotifications: true,
    friendRequests: true,
    familyWalkNotifications: true,
    myWalkNotifications: true,
    messages: true,
    gangbuntta: true,
  },
  setSetting: async (key, value) => {
    try {
      if (key === 'messages' || key === 'myWalkNotifications') {
        await updateSetting({
          type: key === 'messages' ? 'CHAT' : 'WALK',
          isAgreed: value ? 'TRUE' : 'FALSE',
        })
      }
      set(state => ({
        settings: {
          ...state.settings,
          [key]: value,
        },
      }))
    } catch (error) {
      console.error('설정 업데이트 실패:', error)
      throw error
    }
  },
}))

export type SettingsStoreKey = keyof SettingValues
