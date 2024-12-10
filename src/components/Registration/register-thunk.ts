import { AppThunk } from '../../shared/redux.ts'
import RegService from './reg-service.ts'
import { regSlice } from './reg.slice.ts'


export const registerThunk =
  (name: string, password: string): AppThunk => async (dispatch) => {
    try {
      const response = await RegService.registration({ name, password})

      if (response.data) {
        dispatch(regSlice.actions.register(response.data))
        // localStorage.setItem('token', response.data.accessToken)
      }

    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        const errorMessage = e.response.data.message
        dispatch(regSlice.actions.registerError(errorMessage))
      } else {
        dispatch(regSlice.actions.registerError(e.toString()))
      }
    }
  }
