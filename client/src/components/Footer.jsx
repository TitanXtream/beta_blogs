import React from "react";
import {
  SiReact,
  SiTailwindcss,
  SiRedux,
  SiMongodb,
  SiGithub,
  SiVisualstudiocode,
  SiExpress,
} from "react-icons/si";
import { IoLogoFigma } from "react-icons/io5";
import { BsBookmarkFill } from "react-icons/bs";
import { DiNodejs } from "react-icons/di";
import { motion } from "framer-motion";
import { footerVariants } from "../utils/motion";
const Footer = () => {
  return (
    <motion.div variants={footerVariants} initial="hidden" whileInView="show">
      <div className="bg-slate-700/90 p-[10px] px-[30px] text-gray-400">
        <section className="flex flex-col justify-evenly items-center py-[20px]">
          <h3 className="text-[20px]">Thanks to</h3>

          {/* ==================== LOGO STACK - START ==================== */}
          <div className="f-r-between justify-evenly py-[20px] sm:text-[50px] text-[30px] sm:gap-[50px] gap-[20px] flex-wrap">
            <SiReact />
            <SiTailwindcss />
            <BsBookmarkFill className=" rotate-180" />
            <SiRedux />
            <DiNodejs className="text-[100px]" />
            <SiExpress />
            <SiMongodb />
            <IoLogoFigma />
            <SiVisualstudiocode />
            <SiGithub />
          </div>
          {/* ==================== LOGO STACK - END ==================== */}

          <p>Put all other components here </p>
        </section>

        {/* ==================== COPYWRITE - START ==================== */}
        <section className="w-full p-[10px] flex justify-center border-t-[1px] border-yellow-500">
          <p className="text-gray-300 text-center">
            &copy; Copyright 2022 -{" "}
            <span className="font-bold">Alfa Blogs</span> by{" "}
            <button className="text-yellow-500 cursor-pointer">
              TitanXtream
            </button>
          </p>
        </section>
        {/* ==================== COPYWRITE - END ==================== */}
      </div>
    </motion.div>
  );
};

export default Footer;
