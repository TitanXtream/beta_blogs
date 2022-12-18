import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/design-img/logo.png";
import Navbar from "./Navbar";
import { navVariants } from "../utils/motion";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className="w-full bg-white sm:p-[20px] p-[10px] "
    >
      <div className="md:h-[50px] h-[40px] w-full f-r-between m-auto max-w-[1550px]">
        <Link to="/" className="f-r-between gap-[10px] h-[50px]">
          <img src={Logo} alt="Logo" className="md:h-[50px] h-[40px]" />
          <h1 className="md:text-[30px] xs:text-[25px] font-bold text-[0] ">
            Alfa Blogs
          </h1>
        </Link>

        <Navbar />
      </div>
    </motion.div>
  );
};

export default Header;
