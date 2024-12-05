import { AppThunk } from '../../shared/redux.ts'
import { queryClient } from '../../shared/api/query-client.ts'
import { authSlice } from './auth.slice.ts'

export const logoutThunk = (): AppThunk => async (dispatch) => {
  try {
    dispatch(authSlice.actions.logout())
    queryClient.removeQueries()
    localStorage.removeItem('token')
  } catch (e: any) {
    // dispatch(authSlice.actions.setError(e as string))
    if (e.response && e.response.data && e.response.data.message) {
      const errorMessage = e.response.data.message
      dispatch(authSlice.actions.setError(errorMessage))
    } else {
      dispatch(authSlice.actions.setError(e.toString()))
    }
  }
}