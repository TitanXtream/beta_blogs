import React from "react";
import { TbFileX } from "react-icons/tb";

import { motion } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { Link } from "react-router-dom";
const AlertEmpty = ({ name }) => {
  return (
    <motion.div
      variants={fadeIn("up", "tween", 0.1, 1)}
      className="md:w-[600px] w-[500px] max-w-[100%] bg-white h-auto p-[20px] rounded-[20px] shadow-lg shadow-slate-700/30 text-pink-600 xs:mt-0 mt-[50px]"
    >
      <motion.h3
        variants={fadeIn("right", "tween", 0.1, 1)}
        className="font-bold md:text-[30px] sm:text-[25px] xs:text-[20px] text-[18px] max-w-full text-ellipsis overflow-hidden"
      >
        Hey {name} !!
      </motion.h3>
      <motion.p
        variants={fadeIn("left", "tween", 0.1, 1)}
        className="md:text-[25px] sm:text-[22px] text-[16px] text-center font-semibold sm:mt-[30px] mt-[20px] "
      >
        Looks like you don't have any blog yet
      </motion.p>
      <p className="block m-auto w-max sm:mt-0 mt-[20px]">
        <TbFileX className="text-[80px] sm:text-[120px]" />
      </p>
      <motion.div variants={fadeIn("up", "tween", 0.1, 1)}>
        <Link
          to="/create"
          className="primary_btn sm:mt-[30px] mt-[20px] m-auto"
        >
          Lets create a blog !!
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default AlertEmpty;
