import React, { useEffect, useState } from "react";
import { AlertEmpty, BlogCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../actions";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { staggerContainer } from "../utils/motion";

const AllBlogsTable = ({ user, type }) => {
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState([]);
  const AllBlogs = useSelector((state) => state.blogManager.allBlogs);

  useEffect(() => {
    if (user) {
      const resp = dispatch(getAllBlogs(user?.email));
      toast.promise(resp, {
        pending: "Loading blogs",
      });
    }
  }, [dispatch, user]);

  useEffect(() => {
    type === "ME"
      ? setBlogs(AllBlogs.filter((blog) => blog.authName === user?.name))
      : setBlogs(
          AllBlogs.slice().sort((acc, req) => req.likesCount - acc.likesCount)
        );
  }, [AllBlogs, type, user?.name]);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="h-auto w-full flex flex-row flex-wrap justify-center md:p-[50px] sm:p-[35px] p-[20px] sm:gap-[80px] gap-[30px]"
    >
      {AllBlogs?.length > 0 ? (
        blogs?.map((blog, i) => {
          let blogType = "ME";
          if (type === "ALL") {
            if (blog.authName !== user?.name) {
              blogType = "ALL";
            }
          }
          return <BlogCard key={i} blog={blog} type={blogType} />;
        })
      ) : (
        <AlertEmpty name={user?.name} />
      )}
    </motion.section>
  );
};

export default AllBlogsTable;
