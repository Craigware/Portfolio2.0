import { motion } from "framer-motion";
import { useRef } from "react";
import Dood from "./Dood";

const Pushing = ({scrollInformation}) => {
  const doods = [];
  
  return(
    <>
      <motion.div id="Pushing">
        {scrollInformation.current.scrollDirection}
        {scrollInformation.current.isScrolling}
        {doods.map((dood, i) => {
          return <Dood src={dood} />
        })}
      </motion.div>
    </>
  )
}

export default Pushing;