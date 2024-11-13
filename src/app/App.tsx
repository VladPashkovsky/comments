import styles from './App.module.css'
import Login from '../components/Login'
import Background from '../components/Background'
import QuestionForm from '../components/QuestionForm'
import ParallaxEnter from '../components/ParallaxEnter'
import Tasks from '../components/Tasks'
import Stars from '../components/Stars'
import List from '../components/List'

function App() {

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
        {/*<div className={styles.forms}>*/}
          <div className={styles.form_task}>
            <Tasks />
          </div>
          <div className={styles.form_question}>
            <QuestionForm />
          </div>
        <Stars />

        <div className={styles.list_background}>
          <div className={styles.form_list}>
            <List />
          </div>
        </div>


        {/*</div>*/}
      </div>


    </>
  )
}


export default App
