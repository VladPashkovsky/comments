import { authSlice, AuthState } from '../../components/Login/auth.slice.ts'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL

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

  if (init?.json) {

    const token = localStorage.getItem('token')
    if (token) {
      headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...headers,
      }
    }

    // headers = {
    //   'Content-Type': 'application/json',
    //   ...headers,
    // }
    init.body = JSON.stringify(init.json)
  }

  const result = await fetch(`${API_URL}${url}`, {
    ...init, headers,
  })

  if (!result.ok) {
    throw new ApiError(result)
  }
  // const data = (await result.json()) as Promise<T>
  const data = await result.json() as T
  if (typeof data === 'object' && data !== null && 'accessToken' in data) {
    localStorage.setItem('token', (data as { accessToken: string }).accessToken)
  }
  return data

}