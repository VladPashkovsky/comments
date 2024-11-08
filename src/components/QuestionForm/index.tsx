import styles from './style.module.css'
import {useRef, useState} from 'react'

const QuestionForm = () => {
  const [height, setHeight] = useState('100px');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = () => {
    if (textareaRef.current) {
      setHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }

  return (
    <div className={styles.box}>
      <div className={styles.user}>
        <span className={styles.online}></span>
        <span className={styles.user_info}>User: <span className={styles.user_item}>Somebody</span> </span>
      </div>
      <div className={styles.login}>
        <form className={styles.loginBx}>
          <h2><i>Request</i></h2>
          <div className={styles.inptBtn}>
            <textarea
              className={styles.textarea} placeholder="Question" />
            <button>ADD</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default QuestionForm