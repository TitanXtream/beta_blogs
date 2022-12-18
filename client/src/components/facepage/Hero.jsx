import React from "react";
import { Link } from "react-router-dom";
import hero_blog from "../../assets/design-img/hero_blog.png";
import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeIn,
  textContainer,
  textVariant2,
} from "../../utils/motion";

const Hero = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="w-full min-h-[600px] md:p-[40px] p-[10px] m-auto max-w-[1550px]"
    >
      <motion.section
        variants={fadeIn("up", "tween", 0.1, 1)}
        className="relative w-full min-h-[400px] sm:p-[20px] p-[10px] bg-white sm:rounded-[50px] rounded-2xl overflow-hidden"
      >
        {/* ======================== BG-STYLING - START ======================== */}
        <div className="absolute h-[200px] w-[200px] bg-yellow-200/80 rounded-full blur-2xl top-[-70px] left-[15%] z-[10] translate-x-[-50%]" />
        <div className="absolute h-[220px] w-[220px] bg-yellow-300/80 rounded-full blur-2xl top-[-70px] left-[25%] z-[10] translate-x-[-50%]" />
        <div className="absolute h-[150px] w-[150px] bg-yellow-200/80 rounded-full blur-2xl top-[-70px] right-[15%] z-[10] translate-x-[50%]" />
        <div className="absolute h-[400px] w-[400px] bg-pink-300/80 rounded-full blur-2xl bottom-[-70px] right-[25%] z-[10] translate-x-[50%]" />
        <div className="absolute h-[240px] w-[240px] bg-pink-400/70 rounded-full blur-2xl bottom-[-70px] left-[10%] z-[10] translate-x-[-50%]" />
        {/* ======================== BG-STYLING - END ======================== */}

        <div className="relative h-full w-full z-[100] md:flex-row f-c-between gap-[15px] items-center">
          {/* ======================== IMAGE DIV - START ======================== */}

          <div className="sm:h-[400px] xs:h-[320px] h-[280px] w-[400px] min-w-[300px] flex justify-center items-center">
            <motion.img
              variants={fadeIn("right", "tween", 0.2, 1)}
              src={hero_blog}
              alt="Hero Blog Sample"
              className="xs:h-[280px] xs:w-[220px] w-[180px] aspect-auto shadow-lg shadow-slate-800/50 rounded-lg"
            />
          </div>

          {/* ======================== IMAGE DIV - END ======================== */}
          <div className="p-[10px] sm:pr-[30px]">
            {/* ======================== TEXT PART - START ======================== */}

            <motion.p
              variants={textContainer}
              className="lg:text-[40px] sm:text-[30px] xs:text-[25px] text-[16px] md:text-start m-auto text-center"
            >
              {Array.from("Make your own blog today").map((letter, index) => (
                <motion.span variants={textVariant2} key={index}>
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.p>
            <p className="lg:text-[30px] sm:text-[25px] xs:text-[20px] text-[16px] font-bold md:text-start text-center">
              Level up your skills by reading two blogs everyday
            </p>
            <p className="xs:text-[18px] text-[12px] md:text-start text-center">
              Get blogs on your favourite topic
            </p>

            {/* ======================== TEXT PART - END ======================== */}

            {/* ================== LET START BUTTON - START ================== */}

            <motion.div variants={fadeIn("up", "tween", 0.3, 1)}>
              <Link
                to="/login"
                className="primary_btn sm:mt-[30px] mt-[20px] m-auto  md:mx-0 "
              >
                Let start!
              </Link>
            </motion.div>

            {/* ================== LET START BUTTON - END ================== */}
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Hero;
