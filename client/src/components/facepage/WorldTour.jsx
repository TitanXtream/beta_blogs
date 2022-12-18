import React from "react";

import { motion } from "framer-motion";
import worldMap from "../../assets/design-img/world-map.png";
import tourCard from "../../assets/design-img/tour-card.png";
import {
  staggerContainer,
  slideIn,
  fadeIn,
  textContainer,
  textVariant2,
} from "../../utils/motion";

const WorldTour = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="h-auto m-auto max-w-[1550px]"
    >
      <motion.section
        variants={slideIn("left", "tween", 0.2, 1)}
        className="md:w-[85%] sm:w-[90%] w-[95%] min-h-[200px] h-auto bg-white xs:rounded-tr-[80px] rounded-tr-[50px] md:pr-[100px] sm:p[80px] xs:p-[50px] p-[20px] relative overflow-hidden"
      >
        {/* ================ BACKDROUND GRADIENTS ZONE - START ================ */}

        <div className="absolute h-[50%] w-[50%] bg-pink-300/30 blur-2xl z-[-1] rounded-tl-[50px] top-[5%] left-[30%]" />
        <div className="absolute h-[20vw] w-[20vw] bg-pink-400/50 rounded-full blur-2xl top-[-70px] right-[-10%] z-[-1] translate-x-[-50%]" />
        <div className="absolute h-[240px] w-[240px] bg-pink-400/20 rounded-full blur-2xl bottom-[50%] right-[0%] z-[-1] translate-x-[-50%]" />
        <div className="absolute h-[40%] w-[40%] bg-yellow-400/20 rounded-full blur-2xl bottom-[0%] left-[30%] z-[-1] translate-x-[-50%]" />
        <div className="absolute h-[20%] w-[20%] bg-yellow-400/70 rounded-full blur-2xl bottom-[0%] left-[5%] z-[-1] translate-x-[-50%]" />
        <div className="absolute h-[10%] w-[10%] bg-yellow-400/90 rounded-full blur-2xl top-[2%] left-[10%] z-[-1] translate-x-[-50%]" />

        {/* ================ BACKDROUND GRADIENTS ZONE - END ================ */}

        {/* ========================= HEADER - START ========================= */}

        <div className="relative ml-auto flex flex-col w-max min-w-[200px]">
          <motion.p
            variants={textContainer}
            className="text-center sm:text-[50px] xs:text-[30px] text-[20px]"
          >
            {Array.from("Connect the world").map((letter, index) => (
              <motion.span variants={textVariant2} key={index}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.p>
        </div>

        {/* ========================= HEADER - END ========================= */}

        {/* ===================== IMAGES DIV - START ===================== */}

        <div className="w-[100%] flex justify-center">
          <motion.img
            variants={fadeIn("down", "tween", 0.5, 1)}
            src={worldMap}
            alt="world-map"
            className="max-w-[100%] shadow-xl bg-white/50 rounded-[20px]"
          />
          <motion.img
            variants={fadeIn("up", "tween", 0.4, 1)}
            src={tourCard}
            alt=""
            className="absolute bottom-[15%] sm:right-[28%] right-[23%] lg:w-[200px] md:w-[150px] xs:w-[100px] w-[50px]"
          />
        </div>

        {/* ===================== IMAGES DIV - END ===================== */}
      </motion.section>
    </motion.div>
  );
};

export default WorldTour;
