import { Avatar } from 'antd'
import styles from './style.module.css'
import { createAvatar } from '@dicebear/core'
import { openPeeps } from '@dicebear/collection'
import { useMemo } from 'react'
import { animated, useSpring } from '@react-spring/web'


const AvatarUser = () => {

  const notificationProp = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 1000,
    duration: 2000
  })

  let seed = useMemo(() => Math.random().toString(36).slice(2, 11), [])
  const image = createAvatar(openPeeps, {
    seed,
    size: 128, skinColor: ['ffdbb4', 'edb98a', 'd08b5b'],
  }).toDataUri()

  // const userData = useAppSelector(authSlice.selectors.user)
  // @ts-ignore
  //   const avatarUser = userData?.user?.image

  return (
    <animated.div style={notificationProp}>
      <div className={styles.around}>
        <div className={styles.avatar}>
          <Avatar
            size={100}
            src={image}
          />
        </div>
      </div>
    </animated.div>

  )
}

export default AvatarUser