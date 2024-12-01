import $api from '../../shared/api/api-intercept.ts'
import { AxiosResponse } from 'axios'
import { AuthResponse, UserDataLogin, UserDataId } from '../../shared/models/types.ts'

export default class AuthService {
  static async login(data: UserDataLogin): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/users/login', data)
  }

  static async registration(data: UserDataLogin): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/users/register', data)
  }

  static async getUserById(data: UserDataId): Promise<AxiosResponse<AuthResponse>> {
    return $api.get<AuthResponse>(`/users/:${data}`)
  }

  static async logout(): Promise<void> {
    return $api.post('/logout')
  }

  static getUserQueryKey(id: string): string[] {
    return ['user', id];
  }
}