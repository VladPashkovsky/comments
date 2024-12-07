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
  const [messageRegApi, contextHolderRegMessage] = notification.useNotification()

  useEffect(() => {
    if (registerError) {
      messageApi.open({
        type: 'error',
        content: registerError,
        key: 'error',
        duration: 5,
      })
    }

    if (isRegistered) {
      navigate('/')
    }

  }, [registerError, messageApi, messageRegApi, isRegistered])


  useEffect(() => {
    if (isRegistered) {
      messageRegApi.open({
        type: 'success',
        message: 'DONE!',
        description: 'Sign In, please',
        key: 'success',
        duration: 5,
      })
    }
  }, [isRegistered, messageRegApi])

  return (
    <>
      {contextHolderRegMessage}
      {contextHolderMessage}
      {children}
    </>
  )
}

export default RegisterAuth