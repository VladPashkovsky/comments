import React, { FC, JSX } from 'react'
import { useLocation, Navigate } from 'react-router'
import { useAppDispath, useAppSelector } from '../redux.ts'
import { authSlice } from '../../components/Login/auth.slice.ts'
import { animateDown, animateUp } from '../UpDown.ts'


interface RequireAuthProps {
  children: JSX.Element
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const location = useLocation()
  const loginError = useAppSelector(authSlice.selectors.loginError)
  const isActivated = useAppSelector(authSlice.selectors.isActivated)

  // if (!isActivated) {
  //   return <Navigate to='/' state={{ from: location }} />
  // }

  // const nameValue = document.querySelector<HTMLInputElement>('input[name="name"]')
  // const passwordValue = document.querySelector<HTMLInputElement>('input[name="password"]')

  // const inputName = document.getElementsByClassName('inputBox')[0].children[0] as HTMLInputElement
  // const inputPass = document.getElementsByClassName('inputBox')[1].children[0] as HTMLInputElement

  if (!loginError && isActivated) {
    animateDown()
  }

  if (loginError && !isActivated) {
    animateUp()
  }

  return (
    <>
      {children}
    </>
  )
}

export default RequireAuth