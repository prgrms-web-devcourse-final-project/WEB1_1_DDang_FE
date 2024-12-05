import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { fetchProfile, FetchProfileResponse } from '~apis/member/fetchProfile'

export const useFetchProfile = (memberId: number): UseSuspenseQueryResult<FetchProfileResponse, Error> => {
  return useSuspenseQuery<FetchProfileResponse, Error>({
    queryKey: ['profile', memberId],
    queryFn: () => fetchProfile({ memberId }).then(data => data.data),
    staleTime: 1000 * 60 * 5, // 5분
  })
}
