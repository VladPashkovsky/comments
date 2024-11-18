import styles from './App.module.css'
import Login from '../components/Login'
import Background from '../components/Background'
import QuestionForm from '../components/QuestionForm'
import ParallaxEnter from '../components/ParallaxEnter'
import Tasks from '../components/Tasks'
import Stars from '../components/Stars'
import List from '../components/List'
import {useState} from 'react'
import EnergyButton from '../components/EnergyButton'


function App() {
  const [shifted, setShifted] = useState(false);

  const handleButtonClick = () => {
    setShifted(!shifted);
  };

  return (
    <>
      <div className={styles.login_enter}>
        <ParallaxEnter />
        <div className={styles.login_form}>
          <Login />
        </div>
      </div>

      <div className={styles.background}>
        <Background />

        <div className={styles.form_task}>
          <Tasks />
        </div>
        <div className={styles.form_question}>
          <QuestionForm />
        </div>
        <Stars />

        <div className={styles.list_button}>
          {/*<button onClick={handleButtonClick}>L I S T</button>*/}
          <EnergyButton onClick={handleButtonClick}/>
        </div>
        <div className={`${styles.list_background} ${shifted ? styles.shifted : styles.unshifted}`}>
          <div className={`${styles.form_list} ${shifted ? styles.shifted : styles.unshifted}`}>
            <List />
          </div>
        </div>

      </div>


    </>
  )
}


export default App
