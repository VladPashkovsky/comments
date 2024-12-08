import { useState } from 'react'
import EnterForm from '../../shared/forms/EnterForm'
import { useAppDispath } from '../../shared/redux.ts'
import { registerThunk } from './register-thunk.ts'
import { useNavigate } from 'react-router'
import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';


const Registration = () => {

  const dispatch = useAppDispath()
  let navigate = useNavigate()
  const [inputNameValue, setInputNameValue] = useState<string>('')
  const [inputPassValue, setInputPassValue] = useState<string>('')

  let seed = Math.random().toString(36).slice(2, 11)
  const avatar = createAvatar(openPeeps, { seed,
    size: 128, skinColor: ['ffdbb4', 'edb98a', 'd08b5b'],
  }).toDataUri()


  const newHandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      dispatch(registerThunk(inputNameValue, inputPassValue))
      setInputNameValue('')
      setInputPassValue('')
    } catch (err) {
      throw err
    }
  }

  function linkTo(e: any) {
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
      formName={'Registration'}
      fogPass={''}
      signInUp={'Sign In'}
      buttonName={'Sign Up'}
    />
  )
}

export default Registration