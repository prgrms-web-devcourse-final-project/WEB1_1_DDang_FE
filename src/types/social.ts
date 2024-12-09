export type SocialTabs = 'friendList' | 'dangTalk'

export type FriendInfo = {
  profileImg: string
  name: string
  gender: 'MALE' | 'FEMALE'
  role: string
  id: string
  userId: string
}

export type ChatInfo = {
  profileImg: string
  name: string
  gender: 'MALE' | 'FEMALE'
  role: string
  lastChat: string
  unreadChatCount: number
  id: string
  userId: string
}
