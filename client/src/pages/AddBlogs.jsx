import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "../components";
import { createBlog } from "../actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBlogs = () => {
  const user = useSelector((state) => state.authManager.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleBlogAdding = async (addedBlog) => {
    const newBlog = { ...addedBlog, authName: user.name };
    const resp = dispatch(createBlog(newBlog))
      .then(() => navigate("/"))
      .catch((err) => toast.error(err));
    toast.promise(resp, {
      pending: "Adding new blog",
    });
  };

  return (
    <section className="md:py-[50px] py-[10px] flex justify-center">
      <Form callBackFunc={handleBlogAdding} />
    </section>
  );
};

export default AddBlogs;
