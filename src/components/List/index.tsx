import styles from './style.module.css'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import { useAppSelector } from '../../shared/redux.ts'
import { authSlice, AuthState } from '../Login/auth.slice.ts'
import { useEffect, useRef, useState, useCallback } from 'react'
import { useCommentList } from '../CommentForm/use-comment-list.tsx'
import { useDeleteComment } from '../CommentForm/use-delete-comment.ts'
import UpListButton from '../UpListButton'
import { useDispatch } from 'react-redux'
import { tasksSlice } from '../Tasks/tasks.slice.ts'

const List = () => {
  const updatedUserAvatar = useAppSelector(authSlice.selectors.userImage)
  const selectedTask = useAppSelector(tasksSlice.selectors.selectedTask)
  const userData = useAppSelector(authSlice.selectors.user) as AuthState
  const user = userData ? userData.user : null
  const userName = user?.name
  const userAvatar = user?.image
  const userId = user?.id
  const dispatch = useDispatch()

  const {
    commentItemsInfinite,
    isLoadingInfinite,
    refetchInfinite,
    errorInfinite,
    cursor,
  } = useCommentList(userId || '')
  const deleteComment = useDeleteComment()

  const [stateAvatar, setStateAvatar] = useState<string | undefined>()
  const [deletingIds, setDeletingIds] = useState<string[]>([])
  const [hiddenIds, setHiddenIds] = useState<string[]>([])

  const listRef = useRef<HTMLUListElement>(null)

  const scrollToRef = useCallback((node: HTMLLIElement | null) => {
    if (node && selectedTask) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' })
      dispatch(tasksSlice.actions.selectTask(''))
    }
  }, [selectedTask, dispatch])

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

  const handleDelete = async (id: string) => {
    setDeletingIds(prev => [...prev, id])
    try {
      // Запуск анимации
      await new Promise(resolve => setTimeout(resolve, 800))

      // Сокрытие комментария визуально
      setHiddenIds(prev => [...prev, id])

      // Удаление ID из списка анимируемых
      setDeletingIds(prev => prev.filter(itemId => itemId !== id))

      // Фактическое удаление
      await deleteComment.handleDelete(id)
      dispatch(tasksSlice.actions.deleteTask(id))
    } catch (error) {
      console.error('Error deleting comment:', error)
      // В случае ошибки, comment возвращается
      setHiddenIds(prev => prev.filter(itemId => itemId !== id))
    } finally {
      setDeletingIds(prev => prev.filter(itemId => itemId !== id))
    }
  }


  // const handleDelete = async (id: string) => {
  //   setDeletingIds(prev => [...prev, id]);
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 800));
  //     await deleteComment.handleDelete(id);

  //   } catch (error) {
  //     console.error("Error deleting comment:", error);

  //   } finally {
  //     setDeletingIds(prev => prev.filter(itemId => itemId !== id));
  //   }
  // };

  // const handleDelete = async (id: string) => {
  //   setDeletingIds(prev => [...prev, id]);
  //   try {
  //     await new Promise(resolve => setTimeout(resolve, 500));
  //     await deleteComment.handleDelete(id);
  //   } catch (error) {
  //     // setDeletingIds(prev => prev.filter(itemId => itemId !== id));
  //     console.error("Error deleting comment:", error);
  //   }
  // };

  const cursorNoData = cursor?.props?.children[0]?.props?.children

  const scrollToTop = () => {
    listRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className={styles.content}>
      <ul className={styles.team} ref={listRef}>
        {/*{commentItemsInfinite?.slice().reverse().map((todo: any) => (*/}

        {commentItemsInfinite?.pages.map((todo: any) => (

          !hiddenIds.includes(todo.id) && (

            <li
              className={`${styles.member} ${styles['co-funder']} ${deletingIds.includes(todo.id) ? styles.slideOut : ''}`}
              key={todo.id} ref={todo.id === selectedTask ? scrollToRef : null}
            >

              <span className={styles.coFunderLabel}>{todo.createdAt.slice(0, 10)}</span>
              <div className={styles.thumb}><img src={stateAvatar} />

              </div>
              <div className={styles.description}>
                <h3>{userName}</h3>
                <p>
                  {todo.text.length > 160 ? `${todo.text.substring(0, 160)}.....` : todo.text}
                  <br />
                  <button onClick={() => handleDelete(todo.id)}
                          disabled={deleteComment.isPending(todo.id) || deletingIds.includes(todo.id)}
                  >
                    Delete
                  </button>
                </p>
              </div>
            </li>
          )
        ))}
        {cursor}
      </ul>
      {cursorNoData &&
        <div className={styles.upListButton}>
          <UpListButton onClick={scrollToTop} />
        </div>
      }
    </div>
  )
}

export default List