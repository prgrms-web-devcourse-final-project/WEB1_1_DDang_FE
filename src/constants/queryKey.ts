export const queryKey = {
  social: {
    chatRoomList: () => ['chatRoomList'],
    friendList: () => ['friendList'],
    chatMessageList: (chatRoomId: number) => ['chatMessageList', chatRoomId],
  },
  profile: (memberId: number) => ['profile', memberId],
  home: () => ['homePageData'],
  notification: () => ['notification'],
}
