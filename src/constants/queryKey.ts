export const queryKey = {
  social: {
    chatRoomList: () => ['chatRoomList'],
    friendList: () => ['friendList'],
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
}
