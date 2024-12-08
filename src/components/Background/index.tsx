import { useMemo } from 'react'
import { logoutThunk } from '../Login/logout-thunk.ts'
import { useAppDispath } from '../../shared/redux.ts'
import { animateUp } from '../../shared/UpDown.ts'
import { Avatar } from 'antd';
import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';
import styles from './style.module.css'

const Digit = ({ children }: { children: any }) => {
  return <span>{children}</span>
}

const Background = () => {
  const dispatch = useAppDispath()

  let seed = Math.random().toString(36).slice(2, 11)
  const avatar = createAvatar(openPeeps, { seed,
    size: 128, skinColor: ['ffdbb4', 'edb98a', 'd08b5b'],
  }).toDataUri()


  const numString = useMemo(() => {
    return '1298745985471369854834789618786187638748698182386987358' +
      '2198745985471369854834985483478961878618763885471369854' +
      '9874598547136985483478961985471369854834985854834789618' +
      '7861876387486981823869873583698548349854834789618786187' +
      '2198745985471369854834985483478961878618763885471369854' +
      '1298745985471369854834789618786187638748698182386987358' +
      '7861876387486981823869873583698548349854834789618786187' +
      '4834985483478961878618763885483498548347896187861876387' +
      '2198745985471369854834985483478961878618763885471369854' +
      '1298745985471369854834789618786187638748698182386987358' +
      '9874598547136985483478961985471369854834985854834789618' +
      '8651478632149387416978513597589614987456387456981238767' +
      '4834985483478961878618763885483498548347896187861876387' +
      '4789618786187638748698182386987358851359758961487459854' +
      '2198745985471369854834985483478961878618763885471369854' +
      '1298745985471369854834789618786187638748698182386987358' +
      '9874598547136985483478961985471369854834985854834789618' +
      '8651478632149387416978513597589614987456387456981238767' +
      '4834985483478961878618763885483498548347896187861876387' +
      '4789618786187638748698182386987358851359758961487459854' +
      '2198745985471369854834985483478961878618763885471369854' +
      '1298745985471369854834789618786187638748698182386987358' +
      '9874598547136985483478961985471369854834985854834789618' +
      '8961985471369854834985854834789618854834789618786187637'
  }, [])

  const backToLogin = (event: any) => {
    event.preventDefault()
    dispatch(logoutThunk())
    animateUp()
  }

  return (
    <section>
      <div className={styles.windowpic}></div>
      <p className={styles.numbers}>
        {numString.split('').map((num, index) => (
          <Digit key={index}>{num}</Digit>
        ))}
      </p>
      <div className={styles.around}>
        <div className={styles.avatar}>
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            src={avatar}
          />
        </div>
      </div>

      <button className={styles.exit_button} onClick={backToLogin}>Exit</button>
    </section>
  )
}

export default Background