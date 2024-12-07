import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rootReducer } from '../../shared/redux.ts'
import { User, AuthResponse } from '../../shared/models/types.ts'

export type AuthState = {
  user: AuthResponse | null,
  isActivated: boolean,
  loginError?: string
}

const initialAuthState: AuthState = {
  user: null,
  isActivated: false,
  loginError: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  selectors: {
    user: (state) => state.user,
    isActivated: (state) => state.isActivated,
    loginError: (state) => state.loginError,
  },
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload
      state.isActivated = true
      state.loginError = ''
    },

    current: (state, action: PayloadAction<User & { accessToken: string, refreshToken: string }>) => {
      state.user = action.payload
      state.isActivated = true
      state.loginError = ''
    },

    setError: (state, action: PayloadAction<string>) => {
      state.loginError = action.payload
      state.isActivated = false
    },

    logout: (state) => {
      state.user = null
      state.isActivated = false
    },
  },
}).injectInto(rootReducer)
