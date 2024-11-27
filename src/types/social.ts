export type SocialTabs = 'friendList' | 'dangTalk'

export type FriendInfo = {
  profileImg: string
  name: string
  gender: 'male' | 'female'
  role: string
}

export type ChatInfo = {
  profileImg: string
  name: string
  gender: 'male' | 'female'
  role: string
  lastChat: string
  unreadChatCount: number
}
