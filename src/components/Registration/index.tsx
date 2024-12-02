import { useState } from 'react'
import EnterForm from '../../shared/forms/EnterForm'
import { isErrorWithMessage } from '../../shared/isErrorWithMessage.ts'
import { useAppDispath, useAppSelector } from '../../shared/redux.ts'
import { loginThunk, useLoginLoading } from '../Login/login-thunk.ts'
import { authSlice } from '../Login/auth.slice.ts'
import { useNavigate } from 'react-router'


const Registration = () => {
  const dispatch = useAppDispath()
  const loginError = useAppSelector(authSlice.selectors.loginError)
  const isLoading = useLoginLoading()
  let navigate = useNavigate()

  const [inputNameValue, setInputNameValue] = useState<string>('')
  const [inputPassValue, setInputPassValue] = useState<string>('')
  const [error, setError] = useState('')


  const currentUserData = {
    name: inputNameValue,
    password: inputPassValue,
  }


  const newHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      dispatch(loginThunk(inputNameValue, inputPassValue))
    } catch (err) {
      const ifError = isErrorWithMessage(err)
      ifError && setError(err.data.message)
      console.log(`error is: ${error}`)
    }

    console.log(`Error: ${loginError}`)
  }

  const linkTo = (e: any) => {
    e.preventDefault()
    navigate(`/`)
  }


  return (
    <EnterForm
      valueName={inputNameValue}
      valuePass={inputPassValue}
      onChangeName={(e) => setInputNameValue(e.target.value)}
      onChangePass={(e) => setInputPassValue(e.target.value)}
      handleSubmit={newHandleSubmit}
      linkTo={linkTo}
      formName={'Sign Up'}
      fogPass={''}
      signInUp={'Sign In'}
      buttonName={'Sign Up'}
    />
  )
}

export default Registration