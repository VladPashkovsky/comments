import { queryOptions } from '@tanstack/react-query'
import { jsonApiInstance } from '../../shared/api/api-instance.ts'
import $api from '../../shared/api/api-intercept.ts'
import { AuthResponse, UserDataLogin } from '../../shared/models/types.ts'

export type UserDTO = {
  id: string
  name: string,
  password: string,
  image: string
}

export const autApi = {
  baseKey: 'users',

  getUserById: (id: string) => {
    return queryOptions({
      queryKey: [autApi.baseKey, 'byId', id],
      queryFn: (meta) =>
        $api.get<AuthResponse>(`/users/${id}`,
          { signal: meta.signal }),
    })
  },

  // getUserById: (id: string) => {
  //   return queryOptions({
  //     queryKey: [autApi.baseKey, 'byId', id],
  //     queryFn: (meta) =>
  //       jsonApiInstance<UserDTO>(`/users/${id}`,
  //         { signal: meta.signal }),
  //   })
  // },

  loginUser: ({ name, password }: { name: string, password: string }) => {
    return jsonApiInstance<UserDTO[]>(`/users?name=${name}&password=${password}`)
      .then(r => r[0] as UserDTO | undefined)
  },

  signInUser: (data: UserDataLogin) => {
    return jsonApiInstance<AuthResponse>(`/users/login`, {
      method: 'POST',
      json: data,
      // body: JSON.stringify({ name, password }),
      // headers: { 'Content-Type': 'application/json' },
    })
  }
}






