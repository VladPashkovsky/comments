import React, { FC, JSX, useEffect } from 'react'
import { useAppSelector } from '../redux.ts'
import { regSlice } from '../../components/Registration/reg.slice.ts'
import { message, notification } from 'antd'
import { useNavigate } from 'react-router'


interface RequireAuthProps {
  children: JSX.Element
}

const RegisterAuth: FC<RequireAuthProps> = ({ children }) => {

  const registerError = useAppSelector(regSlice.selectors.regError)
  const isRegistered = useAppSelector(regSlice.selectors.isReg)
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