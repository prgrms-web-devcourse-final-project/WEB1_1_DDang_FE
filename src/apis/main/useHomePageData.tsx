import { useSuspenseQuery, UseSuspenseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { queryKey } from '~constants/queryKey'
import { fetchHomePageData, FetchHomePageDataResponse } from './fetchHomePageData'

export const useHomePageData = (): UseSuspenseQueryResult<FetchHomePageDataResponse, AxiosError> => {
  return useSuspenseQuery<FetchHomePageDataResponse, AxiosError>({
    queryKey: queryKey.home(),
    queryFn: () => fetchHomePageData().then(data => data.data),
    staleTime: 5 * 60 * 1000, // 5분
  })
}
