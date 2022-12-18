import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../components";
import { createBlog } from "../actions";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {
  const user = useSelector((state) => state.authManager.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleBlogAdding = async (addedBlog) => {
    console.log(user);
    const newBlog = { ...addedBlog, authName: user.name };
    dispatch(createBlog(newBlog));
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <section className="md:py-[50px] py-[10px] flex justify-center">
      <Form callBackFunc={handleBlogAdding} />
    </section>
  );
};

export default AddBlogs;
