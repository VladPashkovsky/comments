import { AppThunk } from '../../shared/redux.ts'
import UploadService from './upload-service.ts'
import { regSlice } from '../Registration/reg.slice.ts'
import { selectFile } from '../../shared/models/file.ts'
import { queryClient } from '../../shared/api/query-client.ts'
import { MutationObserver, useMutation } from '@tanstack/react-query'

export const uploadAvatarThunk =
  (file: File | null): AppThunk => async (dispatch) => {
    try {
      const response = await new MutationObserver(queryClient, {
        mutationKey: ['avatar'],
        mutationFn: UploadService.uploadAvatar,
      }).mutate({ file })

      if (response.data) {
        dispatch(regSlice.actions.uploadAvatar(response.data))
      }
    } catch (e: any) {
      if (e.response && e.response.data && e.response.data.message) {
        const errorMessage = e.response.data.message
        dispatch(regSlice.actions.uploadAvatarError(errorMessage))
      } else {
        dispatch(regSlice.actions.uploadAvatarError(e.toString()))
      }
    }
  }

export const uploadImageMutation = () => useMutation({
  mutationKey: ['avatar'],
}).isPending