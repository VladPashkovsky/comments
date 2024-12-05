import { useState, useCallback, useEffect } from 'react'
import EnterForm from '../../shared/forms/EnterForm'
import { useAppDispath, useAppSelector } from '../../shared/redux.ts'
import { loginThunk, useLoginLoading } from './login-thunk.ts'
import { authSlice } from './auth.slice.ts'
import { useNavigate } from 'react-router'


const Login = () => {
  const dispatch = useAppDispath()
  const loginError = useAppSelector(authSlice.selectors.loginError)
  const isLoading = useLoginLoading()
  let navigate = useNavigate()
  const [inputNameValue, setInputNameValue] = useState<string>('')
  const [inputPassValue, setInputPassValue] = useState<string>('')
  const [error, setError] = useState<string | undefined>('')


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      dispatch(loginThunk(inputNameValue, inputPassValue))
      setInputNameValue('')
      setInputPassValue('')
    } catch (err) {
      throw err
    }
  }

  const linkTo = (e: any) => {
    e.preventDefault()
    navigate(`/signup`)
  }

  return (
    <>
      <EnterForm
        valueName={inputNameValue}
        valuePass={inputPassValue}
        onChangeName={(e) => setInputNameValue(e.target.value)}
        onChangePass={(e) => setInputPassValue(e.target.value)}
        handleSubmit={handleSubmit}
        linkTo={linkTo}
        formName={'Sign in'}
        fogPass={'Forgot Password?'}
        signInUp={'Sign Up'}
        buttonName={'Login'}
      />
      {/*<div style={{position: 'absolute', left: '50%', width: '150px', height: '150px', background: 'red'}}>*/}
      {/*  <span style={{margin: '5px'}}>{` The Error: ${loginError}`} - {`small: ${error}`}</span>*/}
      {/*</div>*/}
    </>


  )
}

export default Login