import styles from './style.module.css'
import useStore from '../CommentForm/store'
import { createAvatar } from '@dicebear/core'
import { initials } from '@dicebear/collection'
import { useAppSelector } from '../../shared/redux.ts'
import { authSlice, AuthState } from '../Login/auth.slice.ts'
import { useEffect, useState } from 'react'

const List = () => {
  const { todos } = useStore()
  const userData = useAppSelector(authSlice.selectors.user) as AuthState
  const updatedUserAvatar = useAppSelector(authSlice.selectors.userImage)
  const user = userData ? userData.user : null
  const userName = user?.name
  const userAvatar = user?.image
  const userId = user?.id
  const userIdShort = userId?.slice(0, 13)

  const [stateAvatar, setStateAvatar] = useState<string | undefined>()

  const avatar = createAvatar(initials, {
    seed: userName,
    size: 128,
    scale: 120,
    backgroundColor: ['#46a0b5', '#3d747e', '#4b758a'],
    flip: false,
    rotate: 0,
  }).toDataUri()


  useEffect(() => {
    setStateAvatar(userAvatar)
    if (!userAvatar) {
      setStateAvatar(avatar)
    }
    if (updatedUserAvatar) {
      setStateAvatar(updatedUserAvatar)
    }
  }, [userAvatar, updatedUserAvatar])


  return (
    <div className={styles.content}>
      <ul className={styles.team}>
        {todos.slice().reverse().map((todo, _) => (

          <li className={`${styles.member} ${styles['co-funder']}`} key={todo.id}>
            <span className={styles.coFunderLabel}>{userIdShort}</span>
            <div className={styles.thumb}><img src={stateAvatar} />

            </div>
            <div className={styles.description}>
              {/*<h3>Chris Coyier</h3>*/}
              <h3>{userName}</h3>
              <p>
                {todo.text.length > 160 ? `${todo.text.substring(0, 160)}.....` : todo.text}
                <br /><a>Delete</a>
              </p>
            </div>
          </li>

        ))}


        {/*{todos.slice().reverse().map((todo, index) => (*/}

        {/*  <li className={`${styles.member} ${styles['co-funder']}`} key={todo.id}*/}
        {/*      ref={index === 0  ? (node) => node && node.scrollIntoView({ behavior: 'smooth' }) : null}*/}
        {/*  >*/}
        {/*    <span className={styles.coFunderLabel}>Some NEw</span>*/}
        {/*    <div className={styles.thumb}><img*/}
        {/*      // src="https://assets.codepen.io/3/internal/avatars/users/default.png?fit=crop&format=auto&height=120&width=120" />*/}
        {/*      src={avatar} />*/}

        {/*    </div>*/}
        {/*    <div className={styles.description}>*/}
        {/*      <h3>Chris Coyier</h3>*/}
        {/*      <p>*/}
        {/*        {todo.text.length > 160 ? `${todo.text.substring(0, 160)}.....` : todo.text}*/}
        {/*        <br /><a href="https://codepen.io/chriscoyier/">Delete</a>*/}
        {/*      </p>*/}
        {/*    </div>*/}
        {/*  </li>*/}

        {/*))}*/}

        {/*<li className={`${styles.member} ${styles['co-funder']}`}>*/}
        {/*  <span className={styles.coFunderLabel}>Some NEw</span>*/}
        {/*  <div className={styles.thumb}><img*/}
        {/*    src="https://assets.codepen.io/3/internal/avatars/users/default.png?fit=crop&format=auto&height=120&width=120" />*/}
        {/*  </div>*/}
        {/*  <div className={styles.description}>*/}
        {/*    <h3>Chris Coyier</h3>*/}
        {/*    <p>Chris is a front-end developer and designer. He writes a bunch of HTML, CSS, and JavaScript and shakes*/}
        {/*      the pom-poms for CodePen.<br /><a href="https://codepen.io/chriscoyier/">@chriscoyier</a></p>*/}
        {/*  </div>*/}
        {/*</li>*/}

        {/*<li className={`${styles.member} ${styles['co-funder']}`}>*/}
        {/*  <div className={styles.thumb}><img*/}
        {/*    src="https://assets.codepen.io/2/internal/avatars/users/default.png?height=120&width=120" /></div>*/}
        {/*  <div className={styles.description}>*/}
        {/*    <h3>Alex Vazquez</h3>*/}
        {/*    <p>Alex is a full stack developer. Alex does JavaScript development for CodePen, both front end and back,*/}
        {/*      and just about everything else.<br /><a href="https://codepen.io/quezo/">@quezo</a></p>*/}
        {/*  </div>*/}
        {/*</li>*/}

        {/*<li className={styles.member}>*/}
        {/*  <div className={styles.thumb}><img*/}
        {/*    src="https://assets.codepen.io/652/internal/avatars/users/default.png?height=120&width=120" /></div>*/}
        {/*  <div className={styles.description}>*/}
        {/*    <h3>Marie Mosley</h3>*/}
        {/*    <p>Marie wears a lot of hats. She is our documentation lead, customer support maestra, editor, and community*/}
        {/*      manager.<br /><a href="https://codepen.io/mariemosley/">@mariemosley</a></p>*/}
        {/*  </div>*/}
        {/*</li>*/}

        {/*<li className={styles.member}>*/}
        {/*  <div className={styles.thumb}><img*/}
        {/*    src="https://assets.codepen.io/39255/internal/avatars/users/default.png?height=120&width=120" /></div>*/}
        {/*  <div className={styles.description}>*/}
        {/*    <h3>Stephen Shaw</h3>*/}
        {/*    <p>Stephen is a designer/developer residing in Houston. He likes to build animations with CSS &*/}
        {/*      JavaScript.<br /><a href="https://codepen.io/shshaw/">@shshaw</a></p>*/}
        {/*  </div>*/}
        {/*</li>*/}

        {/*<li className={styles.member}>*/}
        {/*  <div className={styles.thumb}><img*/}
        {/*    src="https://picsum.photos/640/300" />*/}
        {/*  </div>*/}
        {/*  <div className={styles.description}>*/}
        {/*    <h3>Rachel Smith</h3>*/}
        {/*    <p>Rachel is a full stack'er in Australia. Not only a creative and talented designer and developer, but a*/}
        {/*      great technical writer.<br /><a href="https://codepen.io/rachsmith/">@rachsmith</a></p>*/}
        {/*  </div>*/}
        {/*</li>*/}

        {/*<li className={styles.member}>*/}
        {/*  <div className={styles.thumb}><img*/}
        {/*    src="https://picsum.photos/640/300" />*/}
        {/*  </div>*/}
        {/*  <div className={styles.description}>*/}
        {/*    <h3>Robert Kieffer</h3>*/}
        {/*    <p>Robert is a full-stack dev with a penchant for open-source work. He dwells in the murky depthsmurky*/}
        {/*      depths of JS.<br /><a href="https://codepen.io/broofa/">@broofa</a></p>*/}
        {/*  </div>*/}
        {/*</li>*/}

        {/*<li className={styles.member}>*/}
        {/*  <div className={styles.thumb}><img*/}
        {/*    src="https://picsum.photos/640/300" />*/}
        {/*  </div>*/}
        {/*  <div className={styles.description}>*/}
        {/*    <h3>Dee Vazquez</h3>*/}
        {/*    <p>Dee is a full stack developer who started her career in finance. She can jump from Rails to React to Go,*/}
        {/*      and also manage our finances.<br /><a href="https://codepen.io/deequez/">@deequez</a></p>*/}
        {/*  </div>*/}
        {/*</li>*/}

      </ul>
    </div>
  )
}

export default List