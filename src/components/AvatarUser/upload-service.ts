import $api from '../../shared/api/api-intercept.ts'
import { AxiosResponse } from 'axios'
import { AuthResponse, } from '../../shared/models/types.ts'

export default class UploadService {
  static async uploadAvatar(file: any): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/users/upload-avatar', file)
    // const formData = new FormData();
    // formData.append('image', file);
    //
    // return $api.post('/users/upload-avatar', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
  }
}