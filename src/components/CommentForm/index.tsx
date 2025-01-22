import styles from './style.module.css'
import { useState } from 'react'
import { authSlice, AuthState } from '../Login/auth.slice.ts'
import { useAppSelector } from '../../shared/redux.ts'
import { useCreateComment } from './use-create-comment.ts'

const TEXT_REQUEST = import.meta.env.VITE_FAKER_API_TEXT

const CommentForm = () => {

  const [newTodo, setNewTodo] = useState('')

  const userData = useAppSelector(authSlice.selectors.user) as AuthState
  const userName = userData?.user?.name

  const createComment = useCreateComment()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const newTodoItem = {
      text: newTodo,
    }

    if (newTodo === '') {
      return
    }

    createComment.handleCreate(newTodoItem.text)
    setNewTodo('')
  }


  const handleText = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    let charactersNumber = Math.floor(Math.random() * (800 - 300 + 1))
    try {
      const response = await fetch(`${TEXT_REQUEST}${charactersNumber}`)

      const data = await response.json()
      const answer = data.data[0].content

      const newTodoItem = {
        text: answer,
      }

      createComment.handleCreate(newTodoItem.text)
      setNewTodo('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTodo(event.target.value)
  }
  0
  return (
    <div className={styles.box}>
      <div className={styles.user}>
        <span className={styles.online}></span>
        <span className={styles.user_info}>User: <span className={styles.user_item}>{userName}</span> </span>
      </div>
      <div className={styles.login}>
        <form className={styles.loginBx} onSubmit={handleSubmit}>
          <h2><i>Comment</i></h2>
          <div className={styles.inptBtn}>
            <textarea value={newTodo} onChange={handleInputChange}
                      className={styles.textarea} placeholder="Text..." />
            <div className={styles.buttonsBox}>
              <button disabled={createComment.isPending}>ADD</button>
              <button onClick={handleText} disabled={createComment.isPending}>Auto</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CommentForm