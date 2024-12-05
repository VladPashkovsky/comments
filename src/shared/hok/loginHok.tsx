import React, { FC, JSX, useEffect } from 'react'
import { useAppSelector } from '../redux.ts'
import { authSlice } from '../../components/Login/auth.slice.ts'
import { animateDown, animateUp } from '../UpDown.ts'
import { message } from 'antd'


interface RequireAuthProps {
  children: JSX.Element
}

const RequireAuth: FC<RequireAuthProps> = ({ children }) => {
  const loginError = useAppSelector(authSlice.selectors.loginError)
  const isActivated = useAppSelector(authSlice.selectors.isActivated)

  // const nameValue = document.querySelector<HTMLInputElement>('input[name="name"]')
  // const passwordValue = document.querySelector<HTMLInputElement>('input[name="password"]')

  // const inputName = document.getElementsByClassName('inputBox')[0].children[0] as HTMLInputElement
  // const inputPass = document.getElementsByClassName('inputBox')[1].children[0] as HTMLInputElement

  const [messageApi, contextHolderMessage] = message.useMessage()

  useEffect(() => {
    if (loginError) {
      messageApi.open({
        type: 'error',
        content: loginError,
      })
    }

    if (!loginError && isActivated) {
      animateDown()
    }

    if (loginError && !isActivated) {
      animateUp()
    }
  }, [loginError, isActivated, messageApi])

  return (
    <>
      {contextHolderMessage}
      {children}
    </>
  )
}

export default RequireAuth