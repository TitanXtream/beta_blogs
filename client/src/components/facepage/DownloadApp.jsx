import React from "react";

import { motion } from "framer-motion";
import android from "../../assets/design-img/android.png";
import {
  staggerContainer,
  slideIn,
  fadeIn,
  textContainer,
  textVariant2,
} from "../../utils/motion";
import { IoLogoGooglePlaystore } from "react-icons/io5";
import { BsApple } from "react-icons/bs";

const DownloadApp = () => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="h-auto m-auto max-w-[1550px] md:mt-[150px] mt-[10vw]"
    >
      <motion.section
        variants={slideIn("right", "tween", 0.2, 1)}
        className="md:w-[85%] sm:w-[90%] w-[95%] min-h-[200px] h-auto bg-white xs:rounded-tl-[80px] rounded-tl-[50px] ml-auto md:pr-[100px] sm:p[80px] xs:p-[50px] p-[20px] relative overflow-hidden"
      >
        <div className="relative flex flex-col w-full">
          {/* ======================= HEADER - START ======================= */}
          <motion.p
            variants={textContainer}
            className="sm:text-[50px] xs:text-[30px] text-[20px] xs:ml-0 ml-[15px]"
          >
            {Array.from("Download App now").map((letter, index) => (
              <motion.span variants={textVariant2} key={index}>
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.p>
          {/* ======================= HEADER - END ======================= */}

          <div className="flex flex-col md:flex-row gap-[20px] w-full h-auto justify-between">
            {/* ================== IMAGE DIV - START ================== */}
            <div className="relative max-w-[800px] w-full">
              <div className="absolute bg-slate-900/60 blur-2xl w-[80%] h-[15%] translate-x-[-50%] left-[50%] bottom-[2%] z-[-1]" />
              <img src={android} alt="android add" className="w-full" />
            </div>
            {/* ================== IMAGE DIV - END ================== */}

            <div
              className="flex md:flex-col flex-row flex-wrap gap-[30px] justify-start
            "
            >
              <motion.p
                variants={fadeIn("up", "tween", 0.5, 1)}
                className="sm:text-[25px] text-[20px] font-semibold w-full"
              >
                Get our app service{" "}
              </motion.p>

              {/* ============= APP DOWNLOADER OPTIONS - START ============= */}
              <motion.div
                className="downloader md:mt-[10vw]"
                variants={fadeIn("left", "tween", 0.5, 1)}
              >
                <div className="logo">
                  <IoLogoGooglePlaystore />
                </div>
                <div className="text_zone">
                  <p className="small_text">GET IT ON</p>
                  <h4 className="large_text">Google play</h4>
                </div>
              </motion.div>

              <motion.div
                className="downloader"
                variants={fadeIn("left", "tween", 0.5, 1)}
              >
                <div className="logo">
                  <BsApple />
                </div>
                <div className="text_zone">
                  <p className="small_text">Download</p>
                  <h4 className="large_text">App Store</h4>
                </div>
              </motion.div>
              {/* ============= APP DOWNLOADER OPTIONS - END ============= */}
            </div>
          </div>
        </div>
      </motion.section>
      ;
    </motion.div>
  );
};

export default DownloadApp;
