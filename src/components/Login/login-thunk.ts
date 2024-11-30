import { AppThunk } from '../../shared/redux.ts'
import { MutationObserver, useMutation } from '@tanstack/react-query'
import { queryClient } from '../../shared/api/query-client.ts'
import { autApi } from './api.ts'
import AuthService from './auth-service.ts'
import { authSlice } from './auth.slice.ts'
import {UserDataLogin} from '../../shared/models/types.ts'

export const loginThunk =
  (name: string, password: string): AppThunk => async (dispatch) => {
    try {
      const user = await new MutationObserver(queryClient, {
        mutationKey: ['login'],
        mutationFn: AuthService.login,
      }).mutate({ name, password })

      user ?
        dispatch(authSlice.actions.login(user.data)) &&
        queryClient.setQueryData(autApi.getUserById(user.data.id).queryKey, user.data) :
        // localStorage.setItem('token', user.accessToken) :
        dispatch(authSlice.actions.setError('Invalid login or password'))


    } catch (e: any) {
      if (e instanceof Error) {
        dispatch(authSlice.actions.setError(e.message))
      } else {
        dispatch(authSlice.actions.setError(e.toString()))
      }
    }
  }

export const useLoginLoading = () => useMutation({
  mutationKey: ['login'],
}).isPending