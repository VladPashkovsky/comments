import styles from './style.module.css'

const Login = () => {
  return (
    // <div className='login_container'>
    <div className={styles.box}>
      <span className={styles.borderLine}></span>
      <form>
        <h2>Sign in</h2>
        <div className={styles.inputBox}>
          <input type="text" required />
          <span>Username</span>
          <i></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password" required />
          <span>Password</span>
          <i></i>
        </div>
        {/*<div className={styles.links}>*/}
        {/*  <a href="#">Forgot Password?</a>*/}
        {/*  <a href="#">Sign Up</a>*/}
        {/*</div>*/}
        <input type="submit" value="Login" />
      </form>
    </div>
    // </div>
  )
}

export default Login