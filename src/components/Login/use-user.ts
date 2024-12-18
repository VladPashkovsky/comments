import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { autApi } from './api.ts'
import { useSelector } from 'react-redux'
import { authSlice } from './auth.slice.ts'
import AuthService from './auth-service.ts'
import { UserDataId } from '../../shared/models/types.ts'

export function useUser() {
  const userId = useSelector(authSlice.selectors.user)
  // return useQuery({
  //   ...autApi.getUserById(userId?.id!),
  //   enabled: Boolean(userId),
  // })
  return useQuery({
    queryKey: ['user', userId?.id],
    queryFn: () => AuthService.getUserById(userId?.id as unknown as UserDataId),
    enabled: Boolean(userId),
  })
}


export function useSuspenseUser() {
  const userId = useSelector(authSlice.selectors.user)
  // return useSuspenseQuery({
  //   ...autApi.getUserById(userId?.id!),
  // })
  return useSuspenseQuery({
    queryKey: ['user', userId?.id],
    queryFn: () => AuthService.getUserById(userId?.id as unknown as UserDataId),
  })
}