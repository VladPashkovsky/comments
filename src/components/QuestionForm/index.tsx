import styles from './style.module.css'
import { useState} from 'react'
import useStore from './store.ts'
import { Todo } from './store.ts'



const QuestionForm = () => {
  const [newTodo, setNewTodo] = useState('');
  const { addTodo } = useStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
    };
    addTodo(newTodoItem);
    setNewTodo('');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodo(event.target.value);
  };

  return (
    <div className={styles.box}>
      <div className={styles.user}>
        <span className={styles.online}></span>
        <span className={styles.user_info}>User: <span className={styles.user_item}>Somebody</span> </span>
      </div>
      <div className={styles.login}>
        <form className={styles.loginBx} onSubmit={handleSubmit}>
          <h2><i>Request</i></h2>
          <div className={styles.inptBtn}>
            <textarea value={newTodo} onChange={handleInputChange}
              className={styles.textarea} placeholder="Question" />
            <button>ADD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionForm