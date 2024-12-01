import { useState } from 'react'
import { isErrorWithMessage } from '../../shared/isErrorWithMessage.ts'
import { useAppDispath, useAppSelector } from '../../shared/redux.ts'
import { loginThunk, useLoginLoading } from '../Login/login-thunk.ts'
import styles from './style.module.css'
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
    // <div className='login_container'>
    <div className={styles.box}>
      <span className={styles.borderLine}></span>
      <form onSubmit={newHandleSubmit}>
        <h2>Sign up</h2>
        <div className={styles.inputBox}>
          <input type="text" onChange={(e) => setInputNameValue(e.target.value)} />
          <span>name</span>
          <i></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password" onChange={(e) => setInputPassValue(e.target.value)} />
          <span>password</span>
          <i></i>
        </div>
        <div className={styles.links}>
          <a href="#"></a>
          <a href="#" onClick={linkTo}>Sign In</a>
        </div>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
    // </div>
  )
}

export default Registration