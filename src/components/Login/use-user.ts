import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { autApi } from './api.ts'
import { useSelector } from 'react-redux'
import { authSlice } from './auth.slice.ts'

export function useUser() {
  const userId = useSelector(authSlice.selectors.user)
  return useQuery({
    ...autApi.getUserById(userId?.id!),
    enabled: Boolean(userId),
  })
}


export function useSuspenceUser() {
  const userId = useSelector(authSlice.selectors.user)
  return useSuspenseQuery({
    ...autApi.getUserById(userId?.id!),
  })
}