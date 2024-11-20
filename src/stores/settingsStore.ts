import { create } from 'zustand'

type SettingsStore = {
  allNotifications: boolean
  friendRequests: boolean
  familyWalkNotifications: boolean
  myWalkNotifications: boolean
  messages: boolean
  gangbuntta: boolean
  setFriendRequests: (value: boolean) => void
  setFamilyWalkNotifications: (value: boolean) => void
  setMyWalkNotifications: (value: boolean) => void
  setMessages: (value: boolean) => void
  setGangbuntta: (value: boolean) => void
  setAllNotifications: (value: boolean) => void
}

export const useSettingsStore = create<SettingsStore>(set => ({
  allNotifications: true,
  friendRequests: true,
  familyWalkNotifications: true,
  myWalkNotifications: true,
  messages: true,
  gangbuntta: true,

  setAllNotifications: value => set({ friendRequests: value }),
  setFriendRequests: value => set({ friendRequests: value }),
  setFamilyWalkNotifications: value => set({ familyWalkNotifications: value }),
  setMyWalkNotifications: value => set({ myWalkNotifications: value }),
  setMessages: value => set({ messages: value }),
  setGangbuntta: value => set({ gangbuntta: value }),
}))
