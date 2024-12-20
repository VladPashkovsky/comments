import { Avatar } from 'antd'
import styles from './style.module.css'
import { createAvatar } from '@dicebear/core'
import { openPeeps } from '@dicebear/collection'
import { useMemo } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react'
import { useAppDispath, useAppSelector } from '../../shared/redux.ts'
import { uploadAvatarThunk, uploadImageMutation } from './upload-avatar-thunk.ts'
import { fileToDataURI, getImageSizes, selectFile, validateFileSize } from '../../shared/models/file.ts'
import { authSlice, AuthState } from '../Login/auth.slice.ts'
import { User, AuthResponse, UserDataId } from '../../shared/models/types.ts'
import { useMutation } from '@tanstack/react-query';

const IMAGE_MAX_SIZE = import.meta.env.VITE_IMAGE_MAX_SIZE

const AvatarUser = () => {
  const dispatch = useAppDispath()
  const [image, setImage] = useState<File | null>(null)

  // const { data, isError, isPending} = useMutation(uploadImageMutation)

  const { user } = useAppSelector(authSlice.selectors.user) as AuthState
  const userId = user?.id
  const userAvatar = user?.image
  console.log(userAvatar)
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
      const file = await selectFile('image/*');
      if (!file) return null;

      if (!validateFileSize(file, IMAGE_MAX_SIZE)) {
        console.error('Файл слишком большой');
        return null;
      }

      const imageSizes = await getImageSizes(file);
      if (!imageSizes) {
        console.error('Не удалось получить размеры изображения');
        return null;
      }

      await fileToDataURI(file);
      return file;
    } catch (error) {
      console.error('Ошибка при выборе файла:', error);
      return null;
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    const file = await handleFileSelect()
    if (file) {
      dispatch(uploadAvatarThunk(file, userId as string))
    }
  }

  return (
    <animated.div style={notificationProp}>
      <div className={styles.around} onClick={handleUpload}
        //      onClick={() => {
        //   const input = document.createElement('input');
        //   input.type = 'file';
        //   input.onchange = handleImageChange;
        //   input.click();
        // }}
      >
        <div className={styles.avatar}>
          <Avatar
            size={100}
            src={userAvatar ? userAvatar : randomImage}
          />
        </div>
      </div>
      {/*<button onClick={handleUpload}>Upload</button>*/}

      {/*<div className={styles.around}>*/}
      {/*  <div className={styles.avatar}>*/}
      {/*    <Avatar*/}
      {/*      size={100}*/}
      {/*      src={randomImage}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </animated.div>

  )
}

export default AvatarUser