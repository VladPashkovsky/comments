import { AppThunk } from '../../shared/redux.ts'
import UploadService from './upload-service.ts'
import { authSlice } from '../Login/auth.slice.ts'
import { selectFile } from '../../shared/models/file.ts'
import { queryClient } from '../../shared/api/query-client.ts'
import { MutationObserver, useMutation } from '@tanstack/react-query'

export const uploadAvatarThunk =
  (file: File | null, id: string): AppThunk => async (dispatch) => {
    try {
      const response = await new MutationObserver(queryClient, {
        mutationKey: ['avatar'],
        mutationFn: UploadService.uploadAvatar,
      }).mutate({ file, id })

      if (response.data) {
        dispatch(authSlice.actions.uploadAvatar(response.data))
        await queryClient.invalidateQueries({ queryKey: ['avatar'] })
      }
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        const errorMessage = e.response.data.message
        dispatch(authSlice.actions.uploadAvatarError(errorMessage))
      } else {
        dispatch(authSlice.actions.uploadAvatarError(e.toString()))
      }
    }
  }

export const uploadImageMutation = () => useMutation({
  mutationKey: ['avatar'],
}).isPending