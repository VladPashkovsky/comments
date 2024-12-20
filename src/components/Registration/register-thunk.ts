import { AppThunk } from '../../shared/redux.ts'
import RegService from './reg-service.ts'
import {authSlice} from '../Login/auth.slice.ts'


export const registerThunk =
  (name: string, password: string): AppThunk => async (dispatch) => {
    try {
      const response = await RegService.registration({ name, password})

      if (response.data) {
        dispatch(authSlice.actions.register(response.data))
        // localStorage.setItem('token', response.data.accessToken)
      }

    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        const errorMessage = e.response.data.message
        dispatch(authSlice.actions.registerError(errorMessage))
      } else {
        dispatch(authSlice.actions.registerError(e.toString()))
      }
    }
  }
