// import { User } from '../../shared/models/types.ts'
// import { authSlice, AuthState } from './auth.slice.ts'
// import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react'
// import {createSelector} from '@reduxjs/toolkit'
// import { useSelector } from 'react-redux'
// import { rootReducer } from '../../shared/redux.ts'
//
// export type AuthResponse = User & { accessToken: string, refreshToken: string }
// export type UserDataLogin = Pick<User, 'name' | 'password'>
// export type UserDataId = Omit<User, 'id'>
//
// export const API_URL = "http://localhost:8000/api"
//
// const selectAccessToken = createSelector(
//   authSlice.selectors.user,
//   (user) => user?.accessToken
// )
//
// const baseQuery = fetchBaseQuery({
//   baseUrl: API_URL,
//   credentials: 'include',
//   // prepareHeaders: (headers) => {
//   //   const token = useSelector((state: { auth: AuthState }) =>
//   //     authSlice.selectors.user(state)?.accessToken) || localStorage.getItem('token')
//   //   token && headers.set('authorization', `Bearer ${token}`)
//   //   return headers
//   // },
//   prepareHeaders: (headers) => {
//    const token = selectAccessToken(AuthState) || localStorage.getItem('token')
//     token && headers.set('authorization', `Bearer ${token}`)
//     return headers
//   }
// })
//
// export const apiAuth = createApi({
//   reducerPath: 'apiAuth',
//   baseQuery,
//   tagTypes: ['Auth'],
//   refetchOnMountOrArgChange: false,
//   endpoints: (builder) => ({
//     login: builder.mutation<AuthResponse, UserDataLogin>({
//       query: (userDataLogin) => ({ url: '/users/login', method: 'POST', body: userDataLogin }),
//       invalidatesTags: ['Auth'],
//     }),
//     current: builder.query<AuthResponse, void>({
//       query: () => ({ url: '/users/refresh' }),
//       providesTags: ['Auth'],
//     }),
//   }),
// })
//
//
//
// export const { useLoginMutation, useCurrentQuery } = apiAuth


import { queryOptions } from '@tanstack/react-query'
import { jsonApiInstance } from '../../shared/api/api-instance.ts'
import {User} from '../../shared/models/types.ts'
import { useSelector } from 'react-redux';
import {authSlice, AuthState} from './auth.slice.ts'


export type UserDataLogin = Pick<User, 'name' | 'password'>
export type UserData = Omit<User, 'id'>
export type AuthResponse = User & { accessToken: string, refreshToken: string }

export type UserDTO = {
  id: string
  name: string,
  password: string
}

export const autApi = {
  baseKey: 'users',

  getUserById: (id: string) => {
    return queryOptions({
      queryKey: [autApi.baseKey, 'byId', id],
      queryFn: (meta) =>
        jsonApiInstance<UserDTO>(`/users/${id}`,
          { signal: meta.signal }),
    })
  },

  loginUser: ({ name, password }: { name: string, password: string }) => {
    return jsonApiInstance<UserDTO[]>(`/users?name=${name}&password=${password}`)
      .then(r => r[0] as UserDTO | undefined)
  },

  signUpUser: (data: UserDataLogin) => {
    return jsonApiInstance<AuthResponse>(`/users/login`, {
      method: 'POST',
      json: data,
      // body: JSON.stringify({ name, password }),
      // headers: { 'Content-Type': 'application/json' },
    })
  }
}






