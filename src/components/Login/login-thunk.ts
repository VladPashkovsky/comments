import { AppThunk } from '../../shared/redux.ts'
import { MutationObserver, useMutation } from '@tanstack/react-query'
import { queryClient } from '../../shared/api/query-client.ts'
import { autApi } from './api.ts'
import { authSlice } from './auth.slice.ts'

export const loginThunk =
  (name: string, password: string): AppThunk => async (dispatch) => {
    try {
      const user = await new MutationObserver(queryClient, {
        mutationKey: ['login'],
        mutationFn: autApi.signUpUser,
      }).mutate({ name, password })

      user ?
        dispatch(authSlice.actions.login(user)) &&
        queryClient.setQueryData(autApi.getUserById(user.id).queryKey, user) &&
        localStorage.setItem('userId', user.id) :
        dispatch(authSlice.actions.setError('Invalid login or password'))

    } catch (e) {
      dispatch(authSlice.actions.setError(e as string))
    }
  }

export const useLoginLoading = () => useMutation({
  mutationKey: ['login'],
}).isPending