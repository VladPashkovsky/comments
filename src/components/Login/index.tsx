import { useState } from 'react'
import EnterForm from '../../shared/forms/EnterForm'
import { isErrorWithMessage } from '../../shared/isErrorWithMessage.ts'
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
    try {
      dispatch(loginThunk(inputNameValue, inputPassValue))
    } catch (err) {
      // const ifError = isErrorWithMessage(err)
      // ifError && setError(err.data.message)
      console.log(`error is: ${err}`)
    }

    // if (!error) {
    //   const duration = 1500
    //   const start = window.scrollY
    //   const end = window.innerHeight
    //   const startTime = performance.now()
    //
    //   function animate() {
    //     const currentTime = performance.now()
    //     const progress = (currentTime - startTime) / duration
    //     const scrollY = start + (end - start) * progress
    //     window.scrollTo(0, scrollY)
    //     if (progress < 1) {
    //       requestAnimationFrame(animate)
    //     }
    //   }
    //
    //   animate()
    // }

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
  }
  console.log(`Error: ${loginError}`)
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

  const linkTo = (e: any) => {
    e.preventDefault()
    navigate(`/signup`)
  }

  return (
    <EnterForm
      valueName={inputNameValue}
      valuePass={inputPassValue}
      onChangeName={(e) => setInputNameValue(e.target.value)}
      onChangePass={(e) => setInputPassValue(e.target.value)}
      handleSubmit={newHandleSubmit}
      linkTo={linkTo}
      formName={'Sign in'}
      fogPass={'Forgot Password?'}
      signInUp={'Sign Up'}
      buttonName={'Login'}
    />
  )
}

export default Login