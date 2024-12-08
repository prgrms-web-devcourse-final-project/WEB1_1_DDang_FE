import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchInviteCode } from './fetchInviteCode'
import { queryKey } from '~constants/queryKey'

export function useInviteCode() {
  return useSuspenseQuery({
    queryKey: queryKey.family.inviteCode(),
    queryFn: () => fetchInviteCode().then(res => res.data),
  })
}
