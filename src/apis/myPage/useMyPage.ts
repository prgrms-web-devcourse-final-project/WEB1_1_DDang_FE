import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchMypage } from '~apis/myPage/fetchMypage'
import { queryKey } from '~constants/queryKey'

export function useMyPage() {
  return useSuspenseQuery({
    queryKey: queryKey.myPage(),
    queryFn: () => fetchMypage().then(res => res.data),
  })
}
