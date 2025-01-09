import $api from '../../shared/api/api-intercept.ts'
import { AxiosResponse } from 'axios'
import { AuthResponse, UserDataId } from '../../shared/models/types.ts'

export default class UploadService {
  static async uploadAvatar(data: any): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append('image', data.file);
    formData.append('id', data.id);
    return $api.post<AuthResponse>('/users/upload-avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }
}