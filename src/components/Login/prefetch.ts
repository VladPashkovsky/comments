import { queryClient } from '../../shared/api/query-client'
import { store } from '../../shared/redux'
import { autApi } from './api'
import { authSlice } from './auth.slice'
import AuthService from './auth-service.ts'
import {UserDataId} from '../../shared/models/types.ts'

export const prefetchAuth = () => {
  // const userId = authSlice.selectors.userId(store.getState())
  const userId = authSlice.selectors.user(store.getState())
  if (userId) {
    // queryClient.prefetchQuery(autApi.getUserById(userId.id))
    // queryClient.prefetchQuery(AuthService.getUserById(userId.id ))
    queryClient.prefetchQuery({
      queryKey: AuthService.getUserQueryKey(userId.id),
      queryFn: () => AuthService.getUserById(userId.id as unknown as UserDataId),
    });
  }
}