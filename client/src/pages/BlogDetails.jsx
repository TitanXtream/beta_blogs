import React, { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RiEditLine } from "react-icons/ri";

const BlogDetails = () => {
  const user = useSelector((state) => state.authManager.user);
  const allBlogs = useSelector((state) => state.blogManager.allBlogs);
  const { id } = useParams();

  const [createdAtTime, setCreatedAtTime] = useState("12 jan 21");
  const [updatedAtTime, setupdatedAtTime] = useState("12 jan 21");

  const getDates = (updatedTime = "2022-11-23T12:41:04.751Z") => {
    const now = new Date(updatedTime);
    const { language } = navigator;

    const actualTime = Intl.DateTimeFormat(language, {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      day: "numeric",
      month: "2-digit",
      year: "numeric",
    })
      .format(now)
      .replaceAll("/", "-")
      .replaceAll(".", ":")
      .split(" ");

    return actualTime;
  };

  const currentBlog = useMemo(() => {
    return { ...allBlogs.find((blog) => blog._id === id) };
  }, [allBlogs, id]);

  useEffect(() => {
    setCreatedAtTime(getDates(currentBlog.createdAt));
    setupdatedAtTime(getDates(currentBlog.updatedAt));
  }, [currentBlog]);

  return (
    <section className="h-full w-full p-[10px]">
      <div className="h-full w-full p-[15px] flex flex-col bg-white/90 rounded-xl shadow-lg shadow-slate-600/50">
        {/* ================ HEADR-START ================ */}
        <div className="f-r-between w-full border-b-[1px] border-gray-900">
          <div className="text-[15px] text-gray-500 pb-[10px]  w-full space-x-2">
            <h1 className="sm:text-[35px] xs:text-[25px] text-[20px] font-bold xs:inline text-black">
              {currentBlog?.title}
            </h1>

            <p className="inline mr-[5px] sm:text-[16px] text-[10px]">
              - by{" "}
              <span className="bg-pink-500 px-[5px] py-[2px] rounded-md text-yellow-200 font-bold whitespace-nowrap">
                {currentBlog?.authName}
              </span>{" "}
              on{" "}
              <span className="font-medium text-pink-400 whitespace-nowrap xs:ml-[5px] ml-[13px] ">
                {`${createdAtTime[0]} / ${createdAtTime[1]}`}
              </span>
            </p>
            <div className=" space-x-2 text-gray-700 sm:text-[14px] text-[10px] break-words">
              <p className="2xs:inline whitespace-pre">- last updated on</p>
              <span className="text-pink-400 font-bold sm:text-[20px] text-[14px] ml-[5px] whitespace-nowrap">
                {updatedAtTime[0]} /
              </span>
              <span className="sm:text-[18px] text-[12px] text-yellow-500 font-semibold whitespace-nowrap">
                {updatedAtTime[1]}
              </span>
            </div>
          </div>
          {user?.name === currentBlog.authName && (
            <Link to={`/${currentBlog._id}/edit`}>
              <button className="bg-blue-500 p-[5px] rounded-md text-white text-[20px] hover:bg-blue-600 hover:shadow-blue-600 hover:shadow-md ">
                <RiEditLine />
              </button>
            </Link>
          )}
        </div>
        {/* ================ HEADR-END ================ */}

        {/* ================ BODY-START ================ */}
        <div className="f-c-between md:flex-row gap-[10px] w-full md:max-h-[70vh] pt-[15px]">
          <div className="md:w-[45%] sm:w-[70%] w-[100%] bg-transparent rounded-md overflow-hidden">
            <img
              src={currentBlog.image}
              alt="Your blog"
              className="max-h-[100%] m-auto sm:min-h-[300px] max-w-[100%]"
            />
          </div>
          <article className="h-auto md:w-[54%] w-[100%] md:text-[20px] text-[14px] italic leading-[1.2] md:overflow-y-auto ">
            {currentBlog.content}
          </article>
        </div>
        {/* ================ BODY-END ================ */}
      </div>
    </section>
  );
};

export default BlogDetails;
