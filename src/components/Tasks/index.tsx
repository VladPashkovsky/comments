import styles from './style.module.css'
import useStore from '../QuestionForm/store.ts'


const Tasks = () => {
  const {todos} = useStore();

  return (
    <div className={styles.box}>
      <div className={styles.user}>
        {/*<span className={styles.online}></span>*/}
        <span className={styles.user_info}>RESPONSE
          {/*<span className={styles.user_item}>Somebody</span> */}
        </span>
      </div>
      <div className={styles.login}>
        <form className={styles.loginBx}>
          {/*<h2><i>TASKS</i></h2>*/}
          <div className={styles.inptBtn}>
            {/*<input type="text" placeholder="Response" />*/}
            {/*<textarea placeholder="Response" />*/}

            <div className={styles.responseForm}>
              {todos.map((todo) => (
                <div key={todo.id} className={styles.responseItem}>{todo.text}</div>
              ))}

            </div>

            {/*<button>ADD</button>*/}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Tasks