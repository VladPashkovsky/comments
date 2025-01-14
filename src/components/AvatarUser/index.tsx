import { Avatar } from 'antd'
import styles from './style.module.css'
import { createAvatar } from '@dicebear/core'
import { openPeeps } from '@dicebear/collection'
import * as React from 'react'
import { useMemo, useState } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useAppDispath, useAppSelector } from '../../shared/redux.ts'
import { uploadAvatarThunk, uploadImageMutation } from './upload-avatar-thunk.ts'
import { fileToDataURI, getImageSizes, selectFile, validateFileSize } from '../../shared/models/file.ts'
import { authSlice, AuthState } from '../Login/auth.slice.ts'


const IMAGE_MAX_SIZE = import.meta.env.VITE_IMAGE_MAX_SIZE

const AvatarUser = () => {
  const dispatch = useAppDispath()
  const isUploadImage = uploadImageMutation()
  const { user } = useAppSelector(authSlice.selectors.user) as AuthState
  const userImage = useAppSelector(authSlice.selectors.userImage)
  const userId = user?.id
  const userAvatar = user?.image
  // const [image, setImage] = useState(userAvatar)
  // console.log(`userImage: ${userImage}`);
  // console.log(`userAvatar: ${userAvatar}`);
  // console.log(`image: ${image}`);

  const notificationProp = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
    duration: 1000,
  })

  let seed = useMemo(() => Math.random().toString(36).slice(2, 11), [])
  const randomImage = createAvatar(openPeeps, {
    seed,
    size: 128, skinColor: ['ffdbb4', 'edb98a', 'd08b5b'],
  }).toDataUri()


  const handleFileSelect = async (): Promise<File | null> => {
    try {
      const file = await selectFile('image/*')
      if (!file) return null

      if (!validateFileSize(file, IMAGE_MAX_SIZE)) {
        console.error('Файл слишком большой')
        return null
      }

      const imageSizes = await getImageSizes(file)
      if (!imageSizes) {
        console.error('Не удалось получить размеры изображения')
        return null
      }

      await fileToDataURI(file)
      return file
    } catch (error) {
      console.error('Ошибка при выборе файла:', error)
      return null
    }
  }

  const handleUpload = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const file = await handleFileSelect()
    if (file) {
      dispatch(uploadAvatarThunk(file, userId as string))
      // setImage(userImage)
    }
  }


  return (
    <animated.div style={notificationProp}>
      <div className={styles.around}
           onClick={handleUpload}
           // aria-disabled={isUploadImage}
      >
        <div className={styles.avatar} aria-disabled={isUploadImage}>

          <Avatar
            size={100}
            src={userImage || !userImage && userAvatar || !userImage && !userAvatar && randomImage}
            // src={image}
          />
        </div>
      </div>
    </animated.div>

  )
}

export default AvatarUser