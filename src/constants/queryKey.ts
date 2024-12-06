export const queryKey = {
  social: {
    chatRoomList: () => ['chatRoomList'],
    friendList: () => ['friendList'],
  },
  profile: (memberId: number) => ['profile', memberId],
  log: {
    walkDetail: (date: string) => ['walkDetail', date],
    walkDates: () => ['walkDates'],
    monthlyWalks: () => ['monthlyWalks'],
    familyWalks: () => ['familyWalks'],
    totalWalks: () => ['totalWalks'],
    currentMonthWalks: () => ['currentMonthWalks'],
  },
} as const
