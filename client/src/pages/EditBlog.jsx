import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateBlog } from "../actions";
import Form from "../components/Form";
import { motion } from "framer-motion";
import { staggerContainer, slideIn } from "../utils/motion";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBlogEditing = async (editedBlog) => {
    await dispatch(updateBlog(editedBlog));
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="md:py-[50px] py-[5px] flex justify-center"
    >
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="w-max h-max"
      ></motion.div>
      <Form blogid={id} callBackFunc={handleBlogEditing} />
    </motion.section>
  );
};

export default EditBlog;
