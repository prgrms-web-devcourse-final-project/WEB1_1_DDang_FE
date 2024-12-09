export const queryKey = {
  social: {
    chatRoomList: () => ['chatRoomList'],
    friendList: () => ['friendList'],
    chatMessageList: (chatRoomId: number) => ['chatMessageList', chatRoomId],
  },
  profile: (memberId: number) => ['profile', memberId],
  home: () => ['homePageData'],
  notification: () => ['notification'],
  dog: {
    profile: (id: number) => ['dog', 'profile', id],
  },
  log: {
    walkDetail: (date: string) => ['walkDetail', date],
    walkDates: () => ['walkDates'],
    monthlyWalks: () => ['monthlyWalks'],
    familyWalks: () => ['familyWalks'],
    totalWalks: () => ['totalWalks'],
    currentMonthWalks: () => ['currentMonthWalks'],
  },
  myPage: () => ['myPage'],
  family: {
    inviteCode: () => ['family', 'inviteCode'],
    profile: () => ['family', 'dogProfile'],
  },
}
