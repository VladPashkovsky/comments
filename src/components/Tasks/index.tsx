import styles from './style.module.css'
import { useAppSelector } from '../../shared/redux.ts'
import { tasksSlice } from './tasks.slice.ts'
import {useAppDispath} from '../../shared/redux.ts'


const Tasks = () => {
  const tasks = useAppSelector(tasksSlice.selectors.tasks)
  const deletedTasks = useAppSelector(tasksSlice.selectors.deletedTasks)
  const dispatch = useAppDispath()

  let taskNumber = 0

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
                <div key={todo.id} onClick={() => dispatch(tasksSlice.actions.selectTask(todo.id!))}
                     className={`${deletedTasks?.includes(todo.id!) ? styles.responseItemDeleted : styles.responseItem} `}
                     ref={index === tasks.length - 1 ? (node) => node && node.scrollIntoView({ behavior: 'smooth' }) : null}>
                  <p className={styles.todoText}>{++taskNumber} - {todo.text}</p>
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