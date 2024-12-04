import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { fetchHomePageData, FetchHomePageDataResponse } from './fetchHomePageData'

export const useHomePageData = (): UseQueryResult<FetchHomePageDataResponse, AxiosError> => {
  return useQuery<FetchHomePageDataResponse, AxiosError>({
    queryKey: ['homePageData'],
    queryFn: () => fetchHomePageData().then(data => data.data),
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5분
  })
}
