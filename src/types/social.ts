export type SocialTabs = 'friendList' | 'dangTalk'

export type FriendInfo = {
  profileImg: string
  name: string
  gender: 'male' | 'female'
  role: string
  id: string
  userId: string
}

//todo 백엔드 맞춰 수정
export type ChatInfo = {
  chatRoomId: number
  name: string
  lastMessage: string
  profileImg: string
  unreadMessageCount: number
  members: [
    {
      memberId: number
      email: string
      name: string
    },
  ]
  gender: 'male' | 'female'
  role: string
}
