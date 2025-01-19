import { authSlice, AuthState } from '../../components/Login/auth.slice.ts'
import { useSelector } from 'react-redux'
import { createSelector } from '@reduxjs/toolkit'

const API_URL = import.meta.env.VITE_API_URL

class ApiError extends Error {
  constructor(public response: Response, public body: string) {
    super(`ApiError: ${response.status} - ${body}`);
    this.name = 'ApiError';
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown },
): Promise<T> => {
  const headers = new Headers(init?.headers ?? {});

  const token = localStorage.getItem('token');
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (init?.json) {
    headers.set('Content-Type', 'application/json');
    init.body = JSON.stringify(init.json);
  }

  // console.log('Sending request to:', `${API_URL}${url}`);
  // console.log('Headers:', Object.fromEntries(headers.entries()));

  try {
    const result = await fetch(`${API_URL}${url}`, {
      ...init,
      headers,
    });

    const responseBody = await result.text();

    if (!result.ok) {
      // console.error('API Error:', result.status, responseBody);
      throw new ApiError(result, responseBody);
    }

    const data = JSON.parse(responseBody) as T;

    if (typeof data === 'object' && data !== null && 'accessToken' in data) {
      localStorage.setItem('token', (data as { accessToken: string }).accessToken);
      console.log('New token saved');
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    } else {
      // console.error('Fetch error:', error);
      throw new Error('An unexpected error occurred');
    }
  }
};

// class ApiError extends Error {
//   constructor(public response: Response) {
//     super('ApiError' + response.status)
//   }
// }
//
// export const jsonApiInstance = async <T>(
//   url: string,
//   init?: RequestInit & { json?: unknown },
// ) => {
//   let headers = init?.headers ?? {}
//
//   if (init?.json) {
//
//     const token = localStorage.getItem('token')
//     if (token) {
//       headers = {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//         ...headers,
//       }
//     }
//
//     init.body = JSON.stringify(init.json)
//   }
//   console.log('Sending request to:', `${API_URL}${url}`)
//   console.log('Headers:', headers)
//
//   const result = await fetch(`${API_URL}${url}`, {
//     ...init, headers,
//   })
//
//   if (!result.ok) {
//     const errorBody = await result.text()
//     console.error('API Error:', result.status, errorBody)
//     throw new ApiError(result)
//   }
//   // const data = (await result.json()) as Promise<T>
//   const data = await result.json() as T
//   if (typeof data === 'object' && data !== null && 'accessToken' in data) {
//     localStorage.setItem('token', (data as { accessToken: string }).accessToken)
//   }
//   return data
//
// }