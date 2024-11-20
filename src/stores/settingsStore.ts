import { create } from 'zustand'

interface SettingsStore {
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
}

export const useSettingsStore = create<SettingsStore>(set => ({
  friendRequests: true,
  familyWalkNotifications: true,
  myWalkNotifications: true,
  messages: true,
  gangbuntta: true,

  setFriendRequests: value => set({ friendRequests: value }),
  setFamilyWalkNotifications: value => set({ familyWalkNotifications: value }),
  setMyWalkNotifications: value => set({ myWalkNotifications: value }),
  setMessages: value => set({ messages: value }),
  setGangbuntta: value => set({ gangbuntta: value }),
}))
