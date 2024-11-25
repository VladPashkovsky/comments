// import { createListenerMiddleware } from '@reduxjs/toolkit'
// import { apiAuth } from './api.ts'
//
// export const authMiddleware = createListenerMiddleware()
// authMiddleware.startListening({
//   matcher: apiAuth.endpoints.login.matchFulfilled,
//   effect: async (action, api) => {
//     action.payload.accessToken && localStorage.setItem('token', action.payload.accessToken)
//     api.cancelActiveListeners()
//   },
// })