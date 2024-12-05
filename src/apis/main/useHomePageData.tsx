import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { fetchHomePageData, FetchHomePageDataResponse } from './fetchHomePageData'
import { queryKey } from '~constants/queryKey'

export const useHomePageData = (): UseQueryResult<FetchHomePageDataResponse, AxiosError> => {
  return useQuery<FetchHomePageDataResponse, AxiosError>({
    queryKey: queryKey.home(),
    queryFn: () => fetchHomePageData().then(data => data.data),
    staleTime: 5 * 60 * 1000, // 5분
  })
}
