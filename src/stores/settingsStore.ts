import { create } from 'zustand'

type SettingsStore = {
  allNotifications: boolean
  friendRequests: boolean
  familyWalkNotifications: boolean
  myWalkNotifications: boolean
  messages: boolean
  gangbuntta: boolean
  setSetting: (key: keyof Omit<SettingsStore, 'setSetting'>, value: boolean) => void
}

export const useSettingsStore = create<SettingsStore>(set => ({
  allNotifications: true,
  friendRequests: true,
  familyWalkNotifications: true,
  myWalkNotifications: true,
  messages: true,
  gangbuntta: true,

  setSetting: (key, value) =>
    set(state => ({
      ...state,
      [key]: value,
    })),
}))

export type SettingsStoreKey = keyof Omit<SettingsStore, 'setSetting'>
