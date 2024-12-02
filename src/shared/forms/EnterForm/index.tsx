import styles from './style.module.css'
import { FC } from 'react'

interface EnterFormProps {
  valueName: string,
  valuePass: string,
  onChangeName: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onChangePass: (e: React.ChangeEvent<HTMLInputElement>) => void,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  linkTo: (e:any) => void,
  formName: string,
  fogPass?: string,
  signInUp?: string,
  buttonName?: string
}


const EnterForm: FC<EnterFormProps> = ({
                                         valueName,
                                         valuePass,
                                         onChangeName,
                                         onChangePass,
                                         handleSubmit,
                                         linkTo,
                                         formName,
                                         fogPass,
                                         signInUp,
                                         buttonName,
                                       }) => {


  return (
    // <div className='login_container'>
    <div className={styles.box}>
      <span className={styles.borderLine}></span>
      <form onSubmit={handleSubmit}>
        <h2>{formName}</h2>
        <div className={styles.inputBox}>
          <input type="text" value={valueName} onChange={onChangeName} />
          <span>name</span>
          <i></i>
        </div>
        <div className={styles.inputBox}>
          <input type="password" value={valuePass} onChange={onChangePass} />
          <span>password</span>
          <i></i>
        </div>
        <div className={styles.links}>
          <a href="#">{fogPass}</a>
          <a href="#" onClick={linkTo}>{signInUp}</a>
        </div>
        <input type="submit" value={buttonName} />
      </form>
    </div>
    // </div>
  )
}

export default EnterForm