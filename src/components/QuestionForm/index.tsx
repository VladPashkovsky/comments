import styles from './style.module.css'

const QuestionForm = () => {
  return (
    <div className={styles.box}>
      <div className={styles.user}>
        <span className={styles.online}></span>
        <span className={styles.user_info}>User: <span className={styles.user_item}>Somebody</span> </span>
      </div>
      <div className={styles.login}>
        <form className={styles.loginBx}>
          <h2><i>Questions</i></h2>
          <div className={styles.inptBtn}>
            <input type="text" placeholder="Question" />
            <button>ADD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionForm