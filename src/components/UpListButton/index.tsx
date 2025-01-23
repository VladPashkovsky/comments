import styles from './style.module.css'

const UpListButton = ({onClick} :{onClick: () => void}) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <div className={`${styles.line} ${styles.one}`}>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
      </div>
      <div className={`${styles.line} ${styles.two}`}>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
      </div>
      <div className={`${styles.line} ${styles.three}`}>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
      </div>
      <div className={`${styles.line} ${styles.four}`}>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
      </div>
      <div className={`${styles.line} ${styles.five}`}>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
      </div>
      <div className={`${styles.line} ${styles.six}`}>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
      </div>
      <div className={`${styles.line} ${styles.seven}`}>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
        <div className={styles.round}></div>
      </div>
    </button>
  )
}

export default UpListButton