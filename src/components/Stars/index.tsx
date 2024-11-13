import styles from './style.module.css'
import { useState } from 'react'


const Stars = () => {

  return (
    <div className={styles.container_window}>
      <div className={styles.stars}></div>
      <div className={styles.stars_two}></div>
    </div>
  )
}

export default Stars