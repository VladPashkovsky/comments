import { authSlice, AuthState } from '../../components/Login/auth.slice.ts'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

const BASE_URL = 'http://localhost:8000/api'

class ApiError extends Error {
  constructor(public response: Response) {
    super('ApiError' + response.status)
  }
}


export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown },
) => {
  let headers = init?.headers ?? {}

  // const token = useSelector((state: { auth: AuthState }) =>
  //   authSlice.selectors.user(state)?.accessToken)

  // const token = createSelector(
  //   authSlice.selectors.user,
  //   (user) => user?.accessToken,
  // )

  // if (token) {
  //   headers = {
  //     Authorization: `Bearer ${token}`,
  //     ...headers,
  //   }
  // }

  if (init?.json) {
    headers = {
      'Content-Type': 'application/json',
      ...headers,
    }
    init.body = JSON.stringify(init.json)
  }

  const result = await fetch(`${BASE_URL}${url}`, {
    ...init, headers,
  })

  if (!result.ok) {
    throw new ApiError(result)
  }
  const data = (await result.json()) as Promise<T>
  return data
}