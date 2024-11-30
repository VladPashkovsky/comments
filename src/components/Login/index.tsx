import { useState } from 'react'
import { isErrorWithMessage } from '../../shared/isErrorWithMessage.ts'
import { useAppDispath, useAppSelector } from '../../shared/redux.ts'
import { loginThunk, useLoginLoading } from './login-thunk.ts'
import styles from './style.module.css'
import { authSlice } from './auth.slice.ts'


const Login = () => {
  const dispatch = useAppDispath()
  const loginError = useAppSelector(authSlice.selectors.loginError)
  const isLoading = useLoginLoading()

  const [inputNameValue, setInputNameValue] = useState<string>('')
  const [inputPassValue, setInputPassValue] = useState<string>('')
  const [error, setError] = useState('')


  const currentUserData = {
    name: inputNameValue,
    password: inputPassValue,
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
      // await sendLoginUser(currentUserData).unwrap()

      // window.scrollTo({
      //   top: window.innerHeight,
      //   behavior: 'smooth'
      // })


      const duration = 1500
      const start = window.scrollY
      const end = window.innerHeight
      const startTime = performance.now()

      function animate() {
        const currentTime = performance.now()
        const progress = (currentTime - startTime) / duration
        const scrollY = start + (end - start) * progress
        window.scrollTo(0, scrollY)
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }

      animate()

  }

  const newHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // const formData = new FormData(e.currentTarget)
    // const name = formData.get('name') as string
    // const password = formData.get('password') as string
    try {
      dispatch(loginThunk(inputNameValue, inputPassValue))
    } catch (err) {
      const ifError = isErrorWithMessage(err)
      ifError && setError(err.data.message)
      console.log(`error is: ${error}`)
    }

    // const duration = 1500
    // const start = window.scrollY
    // const end = window.innerHeight
    // const startTime = performance.now()
    //
    // function animate() {
    //   const currentTime = performance.now()
    //   const progress = (currentTime - startTime) / duration
    //   const scrollY = start + (end - start) * progress
    //   window.scrollTo(0, scrollY)
    //   if (progress < 1) {
    //     requestAnimationFrame(animate)
    //   }
    // }
    //
    // animate()
    console.log(`Error: ${loginError}`)
  }

  // window.scrollTo({
  //   top: window.innerHeight,
  //   behavior: 'smooth'
  // })
  // const duration = 1500
  // const start = window.scrollY
  // const end = window.innerHeight
  // const startTime = performance.now()
  //
  // function animate() {
  //   const currentTime = performance.now()
  //   const progress = (currentTime - startTime) / duration
  //   const scrollY = start + (end - start) * progress
  //   window.scrollTo(0, scrollY)
  //   if (progress < 1) {
  //     requestAnimationFrame(animate)
  //   }
  // }
  // animate()


  return (
    // <div className='login_container'>
    <div className={styles.box}>
      <span className={styles.borderLine}></span>
      <form onSubmit={newHandleSubmit}>
        <h2>Sign in</h2>
        <div className={styles.inputBox}>
          <input type="text"  onChange={(e) => setInputNameValue(e.target.value)} />
          <span>name</span>
          <i></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password"  onChange={(e) => setInputPassValue(e.target.value)} />
          <span>password</span>
          <i></i>
        </div>
        <div className={styles.links}>
          <a href="#">Forgot Password?</a>
          <a href="#">Sign Up</a>
        </div>
        <input type="submit" value="Login" />
      </form>
    </div>
    // </div>
  )
}

export default Login