import $api from '../../shared/api/api-intercept.ts'
import { AxiosResponse } from 'axios'
import { AuthResponse, UserDataLogin } from '../../shared/models/types.ts'

export default class  AuthService {
  static async login(data: UserDataLogin): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/users/login', data)
  }

  static async registration(name: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post('/users/register', { name, password })
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }
}