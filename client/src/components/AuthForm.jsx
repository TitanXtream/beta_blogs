import React from "react";
import { useForm } from "react-hook-form";
import { FaRegTimesCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { staggerContainer, fadeIn } from "../utils/motion";

const AuthForm = ({ type, authFunction }) => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = (user) => {
    authFunction({ ...user });
  };
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
    >
      <motion.section
        variants={fadeIn("up", "tween", 0.1, 1)}
        className="w-[400px] max-w-[100%] h-auto p-[10px] rounded-lg shadow-lg shadow-slate-700 bg-pink-500/80 m-auto mt-[30px]"
      >
        <div className="relative border-b-[1px] border-slate-800">
          <Link to="/" className="absolute">
            <FaRegTimesCircle />
          </Link>
          <h1 className="text-center text-[25px] text-yellow-100 italic font-semibold">
            {type === "SIGNUP" ? "Start now !!" : "Log in"}
          </h1>
        </div>
        <form
          className="flex flex-col gap-[10px] w-full mt-[20px]"
          onSubmit={handleSubmit(submitHandler)}
        >
          <fieldset className="border-[1px] border-pink-800 rounded-lg p-[10px] bg-white/80 hover:bg-white hover:shadow-xl hover:shadow-slate-500 focus-within:bg-white focus-within:shadow-slate-500 focus-within:shadow-xl flex flex-col gap-[10px]">
            <legend className="px-[5px] bg-pink-500 rounded-lg shadow-md shadow-slate-500 text-[12px] xs:text-[15px] text-white">
              Register
            </legend>
            {/* ================ NAME - START ================ */}
            {type === "SIGNUP" && (
              <div className="flex flex-col">
                <label htmlFor="name">Username </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your username"
                  className="authform_input_bar"
                  {...register("name", {
                    required: "Please enter an username",
                  })}
                />
                <p className="text-red-500">{` ${
                  errors?.name?.message ?? ""
                }`}</p>
              </div>
            )}
            {/* ================ NAME - END ================ */}

            {/* ================ EMAIL - START ================ */}
            <div className="flex flex-col">
              <label htmlFor="email" className="w-[full]">
                Email{" "}
              </label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="authform_input_bar"
                {...register("email", {
                  required: "Please enter your email",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-].com+$/i,
                    message: "Please enter valid email",
                  },
                })}
              />
              <p className="text-red-500">{` ${
                errors?.email?.message ?? ""
              }`}</p>
            </div>
            {/* ================ EMAIL - END ================ */}

            {/* ================ PASSWORD - START ================ */}

            <div className="flex flex-col">
              <label htmlFor="password" className="w-[full]">
                Password{" "}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="authform_input_bar"
                {...register("password", {
                  required: "Please enter a password",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+[a-zA-Z0-9-.]+$/i,
                    message: "Please enter valid password",
                  },
                  minLength: {
                    value: 6,
                    message: "password should be more than 5 chars",
                  },
                })}
              />
              <p className="text-red-500">{` ${
                errors?.password?.message ?? ""
              }`}</p>
            </div>
            {/* ================ PASSWORD - END ================ */}

            {/* ================ CONF PASSWORD - START ================ */}

            {type === "SIGNUP" && (
              <div className="flex flex-col">
                <label htmlFor="confpassword" className="w-[full]">
                  Conform password{" "}
                </label>
                <input
                  type="password"
                  id="confpassword"
                  name="confpassword"
                  placeholder="Conform the password"
                  className="authform_input_bar"
                  {...register("confpassword", {
                    required: "Please confirm the password",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Confirm password should match password",
                  })}
                />
                <p className="text-red-500">{` ${
                  errors?.confpassword?.message ?? ""
                }`}</p>
              </div>
            )}
            {/* ================ CONF PASSWORD - END ================ */}
          </fieldset>
          <button className="px-[15px] py-[5px] bg-yellow-100 rounded-lg w-max hover:bg-yellow-200 hover:shadow-lg hover:shadow-yellow-700">
            {type === "SIGNUP" ? "Register" : "Login"}
          </button>
        </form>
      </motion.section>
    </motion.div>
  );
};

export default AuthForm;
