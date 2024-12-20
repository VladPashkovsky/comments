import React, { FC, JSX, useEffect } from 'react'
import { useAppSelector } from '../redux.ts'
import { authSlice } from '../../components/Login/auth.slice.ts'
import { message, notification } from 'antd'
import { useNavigate } from 'react-router'


interface RequireAuthProps {
  children: JSX.Element
}

const RegisterAuth: FC<RequireAuthProps> = ({ children }) => {

  const registerError = useAppSelector(authSlice.selectors.regError)
  const isRegistered = useAppSelector(authSlice.selectors.isReg)
  let navigate = useNavigate()

  const [messageApi, contextHolderMessage] = message.useMessage()
  const [notificationApi, contextHolderNotification] = notification.useNotification()

  useEffect(() => {
    if (registerError) {
      messageApi.open({
        type: 'error',
        content: registerError,
        key: 'error',
        duration: 5,
      })
    }

  }, [registerError, messageApi])


  useEffect(() => {
    if (isRegistered) {
      notificationApi.open({
        message: 'DONE!',
        description: (<> Sign In, please <br/>
                           or  <br/>
                    Sign Up as new user </>),
      })
    }

  }, [isRegistered, notificationApi])

  return (
    <>
      {contextHolderNotification}
      {contextHolderMessage}
      {children}
    </>
  )
}

export default RegisterAuth