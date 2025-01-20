import styles from './style.module.css'
import useStore from '../CommentForm/store.ts'
import { useAppSelector } from '../../shared/redux.ts'
import { tasksSlice } from './tasks.slice.ts'


const Tasks = () => {
  const { todos } = useStore()
  const tasks = useAppSelector(tasksSlice.selectors.tasks)
  const isTasks = useAppSelector(tasksSlice.selectors.isTasks)

  console.log(`tasks:`, tasks)
  console.log(`isTasks:`, isTasks)
  return (
  <div className={styles.box}>
    <div className={styles.user}>
        <span className={styles.user_info}>COMMENTS
        </span>
      </div>
      <div className={styles.login}>

        <form className={styles.loginBx}>
          <div className={styles.inptBtn}>
            <div className={styles.responseForm}>
              {tasks?.map((todo, index) => (
                <div key={todo.id} className={styles.responseItem}
                     ref={index === tasks.length - 1  ? (node) => node && node.scrollIntoView({ behavior: 'smooth' }) : null}>
                  <p className={styles.todoText}>{todo.text}</p>
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Tasks