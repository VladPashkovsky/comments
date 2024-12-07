import $api from '../../shared/api/api-intercept.ts'
import { AxiosResponse } from 'axios'
import { AuthResponse, UserDataLogin, UserDataId } from '../../shared/models/types.ts'

export default class RegService {
  static async registration(data: UserDataLogin): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/users/register', data)
  }
}