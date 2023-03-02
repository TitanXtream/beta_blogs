import React from "react";
import { Link } from "react-router-dom";
import { RiEditLine } from "react-icons/ri";
import { AiOutlineDelete, AiFillLike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { deleteBlog, likeBlog } from "../actions";
import { toast } from "react-toastify";

const BlogCard = ({ blog, type }) => {
  const dispatch = useDispatch();

  const handleBlogDeletinging = async () => {
    const resp = dispatch(deleteBlog(blog._id));
    toast.promise(resp, {
      pending: "Deleting blog",
    });
  };

  const handleBlogLiking = () => {
    if (type !== "ME") {
      dispatch(likeBlog(blog._id));
    }
  };

  return (
    <div className="w-[220px] h-[280px] bg-white rounded-lg pb-[10px] shadow-lg shadow-pink-800/50 cursor-pointer f-c-between hover:shadow-xl hover:shadow-yellow-200 overflow-hidden">
      <Link className="f-c-bwtween h-[88%]" to={`/${blog?._id}`}>
        {/* ====================== BLOGCARD TOP - START ====================== */}

        <div className="h-[40%] flex justify-center bg-pink-200 overflow-hidden object-center">
          <img
            src={blog?.image}
            alt="Person"
            className=" w-full object-cover"
          />
        </div>

        {/* ====================== BLOGCARD TOP - END ====================== */}

        {/* ====================== BLOGCARD MIDDLE - START ====================== */}

        <div className="relative f-c-between justify-start h-[60%] px-[10px] overflow-hidden">
          <div className="overlay-blog" />
          <h1 className="font-bold text-[18px]">{blog?.title}</h1>
          <p className="text-justify">{blog?.content}</p>
        </div>

        {/* ====================== BLOGCARD MIDDLE - END ====================== */}
      </Link>

      {/* ====================== BLOGCARD BOTTOM - START ====================== */}

      <div className="h-[12%] f-r-between px-[10px] ">
        {type === "ME" ? (
          <>
            {/* =================== EDIT & DELETE - START =================== */}
            <div className="flex gap-[5px] items-center h-full">
              <Link to={`/${blog?._id}/edit`}>
                <button className="bg-blue-500 p-[5px] rounded-md text-white text-[20px] hover:bg-blue-600 hover:shadow-blue-600 hover:shadow-md ">
                  <RiEditLine />
                </button>
              </Link>
              <button
                className="rounded-md text-gray-500 text-[24px] hover:text-red-600 h-full"
                onClick={handleBlogDeletinging}
              >
                <AiOutlineDelete />
              </button>
            </div>
            {/* =================== EDIT & DELETE - END =================== */}
          </>
        ) : (
          <p className="text-[14px] border-t-[1px] border-pink-500 w-[70%] text-pink-500 font-semibold overflow-hidden whitespace-nowrap text-ellipsis">
            - by {blog?.authName}
          </p>
        )}
        {/* =================== EDIT & DELETE - END =================== */}
        <div className="flex gap-[5px] items-center h-full">
          <p>{blog?.likesCount}</p>
          <button
            className={`p-[5px] rounded-md  text-[20px] ${
              type === "ALL"
                ? "bg-yellow-400 hover:shadow-md hover:shadow-yellow-400 text-yellow-50"
                : "text-yellow-400"
            }`}
            onClick={handleBlogLiking}
          >
            <AiFillLike />
          </button>
        </div>
      </div>
      {/* =================== EDIT & DELETE - END =================== */}

      {/* ====================== BLOGCARD BOTTOM - END ====================== */}
    </div>
  );
};

export default React.memo(BlogCard);
