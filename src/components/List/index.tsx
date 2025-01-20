import styles from './style.module.css'
import useStore from '../CommentForm/store'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import { useAppSelector } from '../../shared/redux.ts'
import { authSlice, AuthState } from '../Login/auth.slice.ts'
import { useEffect, useState } from 'react'
import { useCommentList } from '../CommentForm/use-comment-list.tsx'
import { useDeleteComment } from '../CommentForm/use-delete-comment.ts'

const List = () => {
  const { todos } = useStore()
  const userData = useAppSelector(authSlice.selectors.user) as AuthState
  const updatedUserAvatar = useAppSelector(authSlice.selectors.userImage)
  const user = userData ? userData.user : null
  const userName = user?.name
  const userAvatar = user?.image

  const { commentItemsInfinite, isLoadingInfinite, refetchInfinite, errorInfinite, cursor } = useCommentList()
  const deleteComment = useDeleteComment()

  const [stateAvatar, setStateAvatar] = useState<string | undefined>()

  const avatar = createAvatar(initials, {
    seed: userName,
    size: 128,
    scale: 120,
    backgroundColor: ['#46a0b5', '#3d747e', '#4b758a'],
    flip: false,
    rotate: 0,
  }).toDataUri()


  useEffect(() => {
    setStateAvatar(userAvatar)
    if (!userAvatar) {
      setStateAvatar(avatar)
    }
    if (updatedUserAvatar) {
      setStateAvatar(updatedUserAvatar)
    }
  }, [userAvatar, updatedUserAvatar])


  if (isLoadingInfinite) {
    return <div>Loading...</div>
  }

  if (errorInfinite) {
    return <div>error: {JSON.stringify(errorInfinite)}</div>
  }

  // console.log(`commentItemsInfinite: ${JSON.stringify(commentItemsInfinite)}`)

  return (
    <div className={styles.content}>
      <ul className={styles.team}>
        {commentItemsInfinite?.slice().reverse().map((todo: any) => (

          <li className={`${styles.member} ${styles['co-funder']}`} key={todo.id}>
            <span className={styles.coFunderLabel}>{todo.createdAt.slice(0, 10)}</span>
            <div className={styles.thumb}><img src={stateAvatar} />

            </div>
            <div className={styles.description}>
              <h3>{userName}</h3>
              <p>
                {todo.text.length > 160 ? `${todo.text.substring(0, 160)}.....` : todo.text}
                <br />
                <button onClick={() => deleteComment.handleDelete(todo.id)}
                        disabled={deleteComment.isPending(todo.id)}
                >
                  Delete
                </button>
              </p>
            </div>
          </li>
        ))}
        {cursor}
      </ul>
    </div>
  )

}

export default List