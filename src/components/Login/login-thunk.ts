import { AppThunk } from '../../shared/redux.ts'
import { MutationObserver, useMutation } from '@tanstack/react-query'
import { queryClient } from '../../shared/api/query-client.ts'
import AuthService from './auth-service.ts'
import { authSlice } from './auth.slice.ts'
import { UserDataId } from '../../shared/models/types.ts'


export const loginThunk =
  (name: string, password: string): AppThunk => async (dispatch) => {
    try {
      const response = await new MutationObserver(queryClient, {
        mutationKey: ['login'],
        mutationFn: AuthService.login,
      }).mutate({ name, password })

      // user &&
      // dispatch(authSlice.actions.login(user.data)) ||
      // // queryClient.setQueryData(AuthService.getUserQueryKey(user.data.id),
      // //   () => user.data.id ? AuthService.getUserById(user.data.id as unknown as UserDataId) : null) &&
      // // queryClient.setQueryData(AuthService.getUserQueryKey(user.data.id), user.data) &&
      // // queryClient.setQueryData(autApi.getUserById(user.data.id).queryKey, user.data) &&
      // // queryClient.setQueryData(AuthService.getUserById(user.data.id as unknown as UserDataId).queryKey, user.data) &&
      // localStorage.setItem('token', user.data.accessToken)

      if (response.data) {
        dispatch(authSlice.actions.login(response.data))
        queryClient.setQueryData(AuthService.getUserQueryKey(response.data.id),
          () => response.data.id ? AuthService.getUserById(response.data.id as unknown as UserDataId) : null)
        localStorage.setItem('token', response.data.accessToken)
      }

    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        const errorMessage = e.response.data.message
        dispatch(authSlice.actions.setError(errorMessage))
      } else {
        dispatch(authSlice.actions.setError(e.toString()))
      }
    }
  }

export const useLoginLoading = () => useMutation({
  mutationKey: ['login'],
}).isPending