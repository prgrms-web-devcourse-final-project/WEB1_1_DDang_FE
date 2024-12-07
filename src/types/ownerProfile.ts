export interface OwnerProfileType {
  avatar: string | undefined
  nickName: string
  position: string
  location: string
  gender: 'MALE' | 'FEMALE' | null
  //? 채팅 구현을 위해 임의로 추가한 부분입니다.
  memberId: number | undefined
}
