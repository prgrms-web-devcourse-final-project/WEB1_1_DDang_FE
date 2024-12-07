import { axiosInstance } from '~apis/axiosInstance'
import { APIResponse, CommonAPIResponse } from '~types/api'

export type RequestFriendRequest = {
  memberId: number
  decision: 'ACCEPT' | 'DENY'
}

export type RequestFriendResponse = Pick<
  CommonAPIResponse,
  'memberId' | 'name' | 'email' | 'provider' | 'gender' | 'address' | 'familyRole' | 'profileImg'
>

export const requestFriend = async (req: RequestFriendRequest): Promise<APIResponse<RequestFriendResponse>> => {
  const { data } = await axiosInstance.post<APIResponse<RequestFriendResponse>>(`/friend`, req)
  return data
}
