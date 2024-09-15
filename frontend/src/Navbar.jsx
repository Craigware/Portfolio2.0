import { motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const [visible, setVisible] = useState();

  return(
    <motion.nav>
      <button>Hamburger Button</button>
    </motion.nav>
  )
}

export default Navbar;