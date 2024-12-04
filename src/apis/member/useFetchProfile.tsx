import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { FetchProfileResponse, fetchProfile } from '~apis/member/fetchProfile'

export const useFetchProfile = (memberId: number): UseQueryResult<FetchProfileResponse, Error> => {
  return useQuery<FetchProfileResponse, Error>({
    queryKey: ['profile', memberId],
    queryFn: () => fetchProfile({ memberId }).then(data => data.data),
    enabled: !!memberId,
  })
}
