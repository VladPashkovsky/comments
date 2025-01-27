import { AppThunk } from '../../shared/redux.ts'
import { queryClient } from '../../shared/api/query-client.ts'
import { authSlice } from './auth.slice.ts'
import AuthService from './auth-service.ts'

export const logoutThunk = (): AppThunk => async (dispatch) => {
  try {
    await AuthService.logout()
    dispatch(authSlice.actions.logout())
    queryClient.removeQueries()
    localStorage.removeItem('token')
  } catch (e: any) {
    if (e.response && e.response.data && e.response.data.message) {
      const errorMessage = e.response.data.message
      dispatch(authSlice.actions.setError(errorMessage))
    } else {
      dispatch(authSlice.actions.setError(e.toString()))
    }
  }
}