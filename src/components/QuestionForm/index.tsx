import styles from './style.module.css'
import { useState } from 'react'
import useStore from './store.ts'
import { Todo } from './store.ts'


const QuestionForm = () => {
  const [newTodo, setNewTodo] = useState('')
  const { addTodo } = useStore()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newTodoItem: Todo = {
      id: Date.now(),
      text: newTodo,
    }

    if (newTodo === '') {
      return
    }
    addTodo(newTodoItem)

    setNewTodo('')
  }

  const handleText = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    let charactersNumber = Math.floor(Math.random() * (800 - 300 + 1))
    try {
      const response = await fetch(`https://fakerapi.it/api/v2/texts?_quantity=1&_characters=${charactersNumber}`)

      const data = await response.json()
      const answer = data.data[0].content

      const newTodoItem: Todo = {
        id: Date.now(),
        text: answer,
      }
      addTodo(newTodoItem)
      setNewTodo('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodo(event.target.value)
  }

  return (
    <div className={styles.box}>
      <div className={styles.user}>
        <span className={styles.online}></span>
        <span className={styles.user_info}>User: <span className={styles.user_item}>Somebody</span> </span>
      </div>
      <div className={styles.login}>
        <form className={styles.loginBx} onSubmit={handleSubmit}>
          <h2><i>Comment</i></h2>
          <div className={styles.inptBtn}>
            <textarea value={newTodo} onChange={handleInputChange}
                      className={styles.textarea} placeholder="Text..." />
            <button>ADD</button>
            <button onClick={handleText}>Auto</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionForm