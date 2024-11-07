import { useRef } from 'react'
import './style.css'

const ParallaxEnter = () => {
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

  return (
    <>
      <header id="header">
        <a href="#" className="logo">Space</a>
        <ul>
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Blog</a></li>
        </ul>
      </header>
      <section id="scene">
        <img src="/parallax/images/basic_space.jpg" alt="space" />
        <h2 id="text" ref={textRef}>Space is near</h2>
        {/*<img src="/parallax/images/01.png" id="img1" alt="01.png" ref={img1Ref} />*/}
        <img src="/parallax/images/02_1.png" id="img2" alt="02.png" ref={img2Ref} />
        <img src="/parallax/images/03_1.png" id="img3" alt="03.png" ref={img3Ref} />
        {/*<img src="/parallax/images/04.png" id="img4" alt="04.png" />*/}
        <img src="/parallax/images/telescope.png" id="img4" alt="04.png"/>
      </section>
      {/*<div className="sec">*/}
      {/*  <h2>Parallax Scrolling Effect</h2>*/}
      {/*  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis doloribus est libero mollitia natus nemo,*/}
      {/*    nulla obcaecati officiis omnis perferendis placeat quam quidem. A ab amet aut est ex fugit illum ipsa iusto*/}
      {/*    molestiae nihil nobis, nostrum perspiciatis quas, quibusdam sapiente sint suscipit vel velit voluptates*/}
      {/*    voluptatum. Blanditiis consequatur facilis inventore nostrum quo. Alias consectetur consequuntur delectus*/}
      {/*    doloremque earum eos ex maiores quos! Accusantium aperiam aut corporis cupiditate earum explicabo facilis*/}
      {/*    optio,*/}
      {/*    perferendis reiciendis repellat. Accusamus autem eaque, earum est illum in ipsam nemo nesciunt obcaecati*/}
      {/*    perferendis qui quisquam ratione tempore temporibus ullam. Ad architecto cum delectus neque reiciendis*/}
      {/*    temporibus.*/}
      {/*    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci cupiditate, debitis deleniti, deserunt*/}
      {/*    dolorum ea earum enim eum ipsam laudantium libero maxime neque possimus recusandae rem repudiandae tempora*/}
      {/*    voluptatum? Amet, beatae culpa dolorum explicabo impedit in libero nobis odit officia optio similique sit*/}
      {/*    soluta*/}
      {/*  </p>*/}
      {/*</div>*/}
    </>

  )
}

export default ParallaxEnter