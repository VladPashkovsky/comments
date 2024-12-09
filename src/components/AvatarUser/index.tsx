import { Avatar } from 'antd';
import { createAvatar } from '@dicebear/core';
import { openPeeps } from '@dicebear/collection';
import styles from './style.module.css'

const AvatarUser = () => {

  let seed = Math.random().toString(36).slice(2, 11)
  const avatar = createAvatar(openPeeps, { seed,
    size: 128, skinColor: ['ffdbb4', 'edb98a', 'd08b5b'],
  }).toDataUri()

  return (
    <div className={styles.around}>
      <div className={styles.avatar}>
        <Avatar
          size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          src={avatar}
        />
      </div>
    </div>
  )
}

export default AvatarUser