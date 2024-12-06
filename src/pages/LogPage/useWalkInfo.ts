import { useSuspenseQuery } from '@tanstack/react-query'
import { fetchWalkDates } from '~apis/log/fetchWalkDates'
import { fetchWalkDetail } from '~apis/log/fetchWalkDetail'
import { fetchCurrentMonthWalks } from '~apis/log/fetchCurrentMonthWalks'
import { fetchFamilyYearlyWalks } from '~apis/log/fetchFamilyYearlyWalks'
import { fetchMonthlyWalks } from '~apis/log/fetchMonthlyWalks'
import { fetchTotalWalkRecords } from '~apis/log/fetchTotalWalkRecords'
import { queryKey } from '~constants/queryKey'
import { dateToString } from '~utils/dateFormat'

export function useWalkDetail(date: Date) {
  return useSuspenseQuery({
    queryKey: queryKey.log.walkDetail(dateToString(date)),
    queryFn: () => fetchWalkDetail({ selectDate: dateToString(date) }).then(res => res.data),
  })
}

export function useWalkDates() {
  return useSuspenseQuery({
    queryKey: queryKey.log.walkDates(),
    queryFn: () => fetchWalkDates().then(res => res.data),
  })
}

export function useMonthlyWalks() {
  return useSuspenseQuery({
    queryKey: queryKey.log.monthlyWalks(),
    queryFn: () => fetchMonthlyWalks().then(res => res.data),
  })
}

export function useFamilyWalks() {
  return useSuspenseQuery({
    queryKey: queryKey.log.familyWalks(),
    queryFn: () => fetchFamilyYearlyWalks().then(res => res.data),
  })
}

export function useTotalWalks() {
  return useSuspenseQuery({
    queryKey: queryKey.log.totalWalks(),
    queryFn: () => fetchTotalWalkRecords().then(res => res.data),
  })
}

export function useCurrentMonthWalks() {
  return useSuspenseQuery({
    queryKey: queryKey.log.currentMonthWalks(),
    queryFn: () => fetchCurrentMonthWalks().then(res => res.data),
  })
}
