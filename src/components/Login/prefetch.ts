import { queryClient } from '../../shared/api/query-client'
import { store } from '../../shared/redux'
import { autApi } from './api'
import { authSlice } from './auth.slice'

export const prefetchAuth = () => {
  // const userId = authSlice.selectors.userId(store.getState())
  const userId = authSlice.selectors.user(store.getState())
  if (userId) {
    queryClient.prefetchQuery(autApi.getUserById(userId.id))
  }
}