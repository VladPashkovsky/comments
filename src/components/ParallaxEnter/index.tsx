import { useRef, useState } from 'react'
import type { MenuProps } from 'antd'
import { Dropdown, Modal, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router'
import { aboutRus, aboutEng } from '../../shared/constants.ts'
import styles from './style.module.css'

const ParallaxEnter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const Front = import.meta.env.VITE_FRONT
  const Back = import.meta.env.VITE_BACK

  const items: MenuProps['items'] = [
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href={Front}>
          Frontend
        </a>
      ),
      key: '0',
      icon: <img src="../../../public/parallax/images/github-mark.svg" width="32" height="32" />,
    },
    {
      label: (
        <a target="_blank" rel="noopener noreferrer" href={Back}>
          Backend
        </a>
      ),
      key: '1',
      icon: <img src="../../../public/parallax/images/github-mark.svg" width="32" height="32" />,
    },
    {
      type: 'divider',
    },
  ]

  // let text = document.getElementById("text");
  // let img1 = document.getElementById("img1");
  // let img2 = document.getElementById("img2");
  // let img3 = document.getElementById("img3");
  //
  // window.addEventListener("scroll", function () {
  //   let value = window.scrollY;
  //   text.style.marginTop = value * -1.5 + "px";
  //   img1.style.top = value * 0.75 + "px";
  //   img2.style.top = value * 0.5 + "px";
  //   img3.style.top = value * 0.25 + "px";
  // })

  const navigate = useNavigate()
  const textRef = useRef<HTMLDivElement>(null)
  const img1Ref = useRef<HTMLImageElement>(null)
  const img2Ref = useRef<HTMLImageElement>(null)
  const img3Ref = useRef<HTMLImageElement>(null)

  window.addEventListener('scroll', function() {
    let value = window.scrollY
    if (textRef.current) {
      textRef.current.style.marginTop = value * -1.5 + 'px'
    }
    if (img1Ref.current) {
      img1Ref.current.style.top = value * 0.75 + 'px'
    }
    if (img2Ref.current) {
      img2Ref.current.style.top = value * 0.5 + 'px'
    }
    if (img3Ref.current) {
      img3Ref.current.style.top = value * 0.25 + 'px'
    }
  })

  function headerGo(e: React.MouseEvent) {
    e.preventDefault()
    navigate('/')
  }

  return (
    <>
      <header id={styles.header}>
        <a href="" className={styles.logo} onClick={headerGo}>COMMENTS</a>
        <ul>
          <li><a className={styles.link} onClick={showModal}>About</a></li>
          <li>
            <a className={styles.link}>
              <Dropdown menu={{ items }}>
                <span onClick={(e) => e.preventDefault()}>
                  <Space>
                    GitHub
                    <DownOutlined />
                  </Space>
                </span>
              </Dropdown>
            </a>
          </li>
        </ul>
        <Modal title="ABOUT:" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={1000}>
          <hr />
          <br />
          <img src="../../../public/parallax/images/flag-ru-svgrepo-com.svg"
               alt="" width={50}
               style={{ position: 'relative', left: '50%' }} />
          <p>{aboutRus}</p> <br />
          <hr />
          <br />
          <img src="../../../public/parallax/images/flag-gb-svgrepo-com.svg"
               alt="" width={50}
               style={{ position: 'relative', left: '50%' }} />
          <p>{aboutEng}</p> <br />
        </Modal>
      </header>
      <section id={styles.scene}>
        <img src="/parallax/images/basic_space.jpg" alt="space" />
        <h2 id="text" ref={textRef}>Space is near</h2>
        <img src="/parallax/images/02_1.png" id="img2" alt="02.png" ref={img2Ref} />
        <img src="/parallax/images/03_1.png" id="img3" alt="03.png" ref={img3Ref} />
        <img src="/parallax/images/telescope.png" id="img4" alt="04.png" />
      </section>
    </>
  )
}

export default ParallaxEnter