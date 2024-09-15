import { useEffect, useRef, useState } from 'react';
import { RotateTitle } from './TypingAnimation';
import { motion, useScroll } from 'framer-motion';
import "./Anim.css";
import Pushing from './Pushing';
import Landing from './Landing';

const Anim = () => {
  const [scroll, setScroll] = useState(0);
  const scrollInformation = useRef({
    scrollPosition: scroll,
    lastScrollPosition: scroll,
    scrollDirection: 0,
    timeScrolled: 0,
    isScrolling: false
  });
  let rotating = false;

  function CheckIfMoving() {
    setTimeout(() => {
      if (scrollInformation.current.scrollPosition != scrollInformation.current.lastScrollPosition) {
        scrollInformation.current.lastScrollPosition = scrollInformation.current.scrollPosition;
        scrollInformation.current.timeScrolled += 1
        CheckIfMoving();
      } else {
        scrollInformation.current.scrollDirection = 0;
        scrollInformation.current.timeScrolled = 0;
        scrollInformation.current.isScrolling = false;
      }
    }, 1000);
  }

  scrollInformation.current.scrollPosition = scroll;
  function handleScroll(e) {
    const direction = (window.scrollY > 19) ? 1 : -1;
    if (!scrollInformation.current.isScrolling) {
      scrollInformation.current.isScrolling = true;
      scrollInformation.current.scrollDirection = direction;
      scrollInformation.current.lastScrollPosition = scrollInformation.current.scrollPosition;
      CheckIfMoving();
    }
    window.scrollTo(0,19);
    console.log(scrollInformation.current.lastScrollPosition, direction);
    if (!(scrollInformation.current.lastScrollPosition <= 0 && direction < 0)) { 
      setScroll((state) => {
        let updated = state+10*direction;
        if (updated < 0) updated = 0;
        return updated;
      });
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div>
        Hello there
      </div>
      <motion.div id="Content"
        initial={{x: 0}}
        // animate={{x:'-100%'}}
        style={{ x: scroll*-1 }}
        // transition={{ duration: 2 }}
      >
        <Landing />
        <Pushing scrollInformation={scrollInformation} />
      </motion.div>
      <div>
        Bye there
      </div>
    </>
  ); 

}

export default Anim;