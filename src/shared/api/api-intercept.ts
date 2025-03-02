import axios from 'axios'
import { AuthResponse } from '../models/types.ts'

const API_URL = import.meta.env.VITE_API_URL
// const API_URL = typeof import.meta !== 'undefined' ? import.meta.env.VITE_API_URL : process.env.VITE_API_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,

})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

$api.interceptors.response.use((config) => {
  return config
}, async (error) => {
  const originalRequest = error.config
  if (error.response.data == 401 && error.config && !error.config._isRetry) {
    originalRequest._isRetry = true
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/users/refresh`, { withCredentials: true })
      localStorage.setItem('token', response.data.accessToken)
      return $api.request(originalRequest)
    } catch (e) {
      console.log('Not authorized')
    }
  }
  throw error
})

export default $api