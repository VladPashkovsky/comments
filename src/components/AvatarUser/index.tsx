import { Avatar } from 'antd'
import styles from './style.module.css'
import { createAvatar } from '@dicebear/core'
import { openPeeps } from '@dicebear/collection'
import { useMemo } from 'react'
import { animated, useSpring } from '@react-spring/web'
import { useState } from 'react';
import { useAppDispath, useAppSelector } from '../../shared/redux.ts'
import { uploadAvatarThunk, uploadImageMutation } from './upload-avatar-thunk.ts'
import { fileToDataURI, getImageSizes, selectFile, validateFileSize } from '../../shared/models/file.ts'
import { regSlice } from '../Registration/reg.slice.ts'
import {authSlice} from '../Login/auth.slice.ts'

const IMAGE_MAX_SIZE = import.meta.env.VITE_IMAGE_MAX_SIZE

const AvatarUser = () => {
  const dispatch = useAppDispath();
  const [image, setImage] = useState<File | null>(null);

  const avatar = useAppSelector(regSlice.selectors.user)
  //@ts-ignore
  console.log(avatar?.user?.image)

  const userId = useAppSelector(authSlice.selectors.user)
  //@ts-ignore
  console.log(userId?.user?.id)

  const notificationProp = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
    duration: 1000
  })

  let seed = useMemo(() => Math.random().toString(36).slice(2, 11), [])
  const randomImage = createAvatar(openPeeps, {
    seed,
    size: 128, skinColor: ['ffdbb4', 'edb98a', 'd08b5b'],
  }).toDataUri()


  // const handleImageChange = (event: any) => {
  //   setImage(event.target.files[0]);
  // };

  const handleFileSelect = async () => {
    const file = await selectFile('image/*')

    if (!validateFileSize(file, IMAGE_MAX_SIZE)) {
      return
    }

    const imageSizes = await getImageSizes(file)

    if (imageSizes) {
       await fileToDataURI(file)
    }
     return file
  }

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    handleFileSelect().then((file) => {
      if (file) {
        dispatch(uploadAvatarThunk(file))
      }
    })
  };

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
            src={randomImage}
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