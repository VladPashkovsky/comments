import styles from './App.module.css'
import Login from '../components/Login'
import Registration from '../components/Registration'
import Background from '../components/Background'
import CommentForm from '../components/CommentForm'
import ParallaxEnter from '../components/ParallaxEnter'
import Tasks from '../components/Tasks'
import Stars from '../components/Stars'
import List from '../components/List'
import { useState } from 'react'
import EnergyButton from '../components/EnergyButton'
import { Route, Routes } from 'react-router'
import RequireAuth from '../shared/hok/loginHok.tsx'
import RegisterAuth from '../shared/hok/registerHok.tsx'
import AvatarUser from '../components/AvatarUser'
import {authSlice} from '../components/Login/auth.slice.ts'
import { useAppSelector } from '../shared/redux.ts'

function App() {
   const isActivated = useAppSelector(authSlice.selectors.isActivated)

  const [shifted, setShifted] = useState(false)

  const handleButtonClick = () => {
    setShifted(!shifted)
  }


  return (
    <>
      <div className={styles.login_enter}>
        <ParallaxEnter />
        {isActivated &&
          <div className={styles.login_avatar}>
            <AvatarUser />
          </div>
        }

        <div className={styles.login_form}>
          <Routes>
          <Route path="/" element={<RequireAuth children={<Login />} />} />
            <Route path="/signup" element={<RegisterAuth children={<Registration />} />} />
          </Routes>
        </div>
      </div>

      <div className={styles.background}>
        <Background />

        <div className={styles.form_task}>
          <Tasks />
        </div>
        <div className={styles.form_question}>
          <CommentForm />
        </div>
        <Stars />

        <div className={styles.list_button}>
          <EnergyButton onClick={handleButtonClick} />
        </div>
        {
          isActivated &&
          <div className={`${styles.list_background} ${shifted ? styles.shifted : styles.unshifted}`}>
            <div className={`${styles.form_list} ${shifted ? styles.shifted : styles.unshifted}`}>
              <List />
            </div>
          </div>
        }
      </div>
    </>
  )
}


export default App
