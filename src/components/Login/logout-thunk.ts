import { AppThunk } from '../../shared/redux.ts'
import { queryClient } from '../../shared/api/query-client.ts'
import { authSlice } from './auth.slice.ts'

export const logoutThunk = (): AppThunk => async (dispatch) => {
  try {
    dispatch(authSlice.actions.logout())
    queryClient.removeQueries()
    localStorage.removeItem('userId')
  } catch (e) {
    dispatch(authSlice.actions.setError(e as string))
  }
}