import React, { FC, JSX, useEffect } from 'react'
import { useAppSelector } from '../redux.ts'
import { authSlice } from '../../components/Login/auth.slice.ts'
import {regSlice} from '../../components/Registration/reg.slice.ts'
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


  const errorMessage = (currentError: string | undefined) => {
    messageApi.open({
      type: 'error',
      content: ` ERROR: ${currentError}`,
      key: 'error',
    })
  }

  useEffect(() => {
    if (registerError) {
      errorMessage(registerError)
    }
  }, [registerError])


  const addedNotification = () => {
    messageRegApi.open({
      message: 'DONE!',
      description: 'Sign In, please',
      className: 'signup',
      placement: 'top',
      style: {
        width: 300,
        textAlign: 'center',
        whiteSpace: 'pre-line',
        fontWeight: 'bold',
        borderRadius: 10,
      },
      duration: 5,
    })
  }

  const navigateBack = () => {
    navigate('/')
  }

  const showNotification = () => {
    setTimeout(addedNotification, 1500)
    // setTimeout(navigateBack, 3000)
  }

  useEffect(() => {
    if (isRegistered) {
      showNotification()
    }
  }, [isRegistered])


  return (
    <>
      {contextHolderMessage}
      {contextHolderRegMessage}
      {children}
    </>
  )
}

export default RegisterAuth