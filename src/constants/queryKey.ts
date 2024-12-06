export const queryKey = {
  social: {
    chatRoomList: () => ['chatRoomList'],
    friendList: () => ['friendList'],
  },
  profile: (memberId: number) => ['profile', memberId],
  home: () => ['homePageData'],
  notification: () => ['notification'],
}
