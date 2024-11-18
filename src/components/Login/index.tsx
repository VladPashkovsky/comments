import styles from './style.module.css'


const Login = () => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // window.scrollTo({
    //   top: window.innerHeight,
    //   behavior: 'smooth'
    // })
    const duration = 1500
    const start = window.scrollY
    const end = window.innerHeight
    const startTime = performance.now()

    function animate() {
      const currentTime = performance.now()
      const progress = (currentTime - startTime) / duration
      const scrollY = start + (end - start) * progress
      window.scrollTo(0, scrollY)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    animate()
  }

  return (
    // <div className='login_container'>
    <div className={styles.box}>
      <span className={styles.borderLine}></span>
      <form onSubmit={handleSubmit}>
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