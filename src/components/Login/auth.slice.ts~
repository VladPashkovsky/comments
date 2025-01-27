import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rootReducer } from '../../shared/redux.ts'
import { User, AuthResponse } from '../../shared/models/types.ts'

export type AuthState = {
  user: User | null,
  isActivated: boolean,
  loginError?: string

  isReg?: boolean,
  regError?: string,
  uploadAvatarError?: string | null;
}

const initialAuthState: AuthState = {
  user: null,
  isActivated: false,
  loginError: '',

  isReg: false,
  regError: '',
  uploadAvatarError: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  selectors: {
    user: (state) => state.user,
    isActivated: (state) => state.isActivated,
    loginError: (state) => state.loginError,
    isReg: (state) => state.isReg,
    regError: (state) => state.regError,
    userImage: (state) => state.user?.image
  },
  reducers: {
    login: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload
      state.isActivated = true
      state.loginError = ''
    },

    current: (state, action: PayloadAction<AuthResponse>) => {
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

    // register: (state, action: PayloadAction<AuthResponse>) => {
    //   state.user = action.payload
    //   state.isReg = true
    //   state.regError = ''
    // },
    //
    // registerError: (state, action: PayloadAction<string>) => {
    //   state.regError = action.payload
    //   state.isReg = false
    // },

    uploadAvatar: (state, action: PayloadAction<string>) => {
      state.user!.image = action.payload
      state.isReg = true
      state.regError = ''
    },

    uploadAvatarError: (state, action: PayloadAction<string>) => {
      state.regError = action.payload
      state.isReg = true
    },
  },
}).injectInto(rootReducer)
