import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { rootReducer } from '../../shared/redux.ts'
import { AuthResponse } from '../../shared/models/types.ts'

export type RegState = {
  user: AuthResponse | null,
  isReg: boolean,
  regError?: string
}

const initialRegState: RegState = {
  user: null,
  isReg: false,
  regError: '',
}

export const regSlice = createSlice({
  name: 'reg',
  initialState: initialRegState,
  selectors: {
    user: (state) => state.user,
    isReg: (state) => state.isReg,
    regError: (state) => state.regError,
  },
  reducers: {
    register: (state, action: PayloadAction<AuthResponse>) => {
      state.user = action.payload
      state.isReg = true
      state.regError = ''
    },

    registerError: (state, action: PayloadAction<string>) => {
      state.regError = action.payload
      state.isReg = false
    },
  },
}).injectInto(rootReducer)

