export const queryKey = {
  social: {
    chatRoomList: () => ['chatRoomList'],
    friendList: () => ['friendList'],
    chatMessageList: (chatRoomId: number) => ['chatMessageList', chatRoomId],
  },
  profile: (memberId: number) => ['profile', memberId],
  home: () => ['homePageData'],
  notification: () => ['notification'],
  log: {
    walkDetail: (date: string) => ['walkDetail', date],
    walkDates: () => ['walkDates'],
    monthlyWalks: () => ['monthlyWalks'],
    familyWalks: () => ['familyWalks'],
    totalWalks: () => ['totalWalks'],
    currentMonthWalks: () => ['currentMonthWalks'],
  },
  family: {
    prevOwnerInto: () => ['prevOwnerInfo'],
    UpdateOwner: () => ['updateOwnerInfo'],
  },
} as const
