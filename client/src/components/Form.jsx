import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Filebase from "react-file-base64";
import { useState } from "react";
import { useSelector } from "react-redux";

const Form = ({ blogid, callBackFunc }) => {
  const allBlogs = useSelector((state) => state.blogManager.allBlogs);

  const [addedImage, setAddedImage] = useState(undefined);
  const [updatedTime, setUpdatedTime] = useState([]);

  const existingBlog = {
    ...allBlogs.find((blog) => blog._id === blogid),
  };

  const processImage = (image) => {
    setAddedImage(image);
    setValue("image", image);
  };

  const getUpdatedDate = (updatedTime = "2022-11-23T12:41:04.751Z") => {
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
    setUpdatedTime(actualTime);
  };

  useEffect(() => {
    if (blogid) {
      processImage(existingBlog.image);
      getUpdatedDate(existingBlog.updatedAt);
    }
  }, []);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ title, content, image }) => {
    const newBlog = {
      ...existingBlog,
      title,
      content,
      image,
    };
    callBackFunc(newBlog);
  };

  return (
    <div className="max-w-[900px] md:w-[80%] w-[98%] xs:py-[10px] py-[5px]  sm:px-[30px] xs:p-[15px] p-[1px] rounded-lg bg-white">
      <form
        className=" flex flex-col items-center w-full"
        onSubmit={handleSubmit(submitHandler)}
      >
        {/* ================== FORM HEADER - START ================== */}
        {blogid ? (
          <div className="sm:text-[15px] text-[12px] text-gray-500 pb-[10px] border-b-[1px] border-gray-900 w-full sm:space-x-2 space-x-1">
            <h1 className="sm:text-[35px] xs:text-[30px] text-[23px]  sm:font-bold font-medium inline text-black">
              {existingBlog.title}{" "}
            </h1>
            <p className="2xs:inline whitespace-pre">- last updated on</p>
            <span className="font-medium text-pink-400 whitespace-nowrap">
              {updatedTime[0]}
            </span>
            <span className="font-medium text-pink-500 whitespace-nowrap">
              / {updatedTime[1]}
            </span>
          </div>
        ) : (
          ""
        )}
        {/* ================== FORM HEADER - END ================== */}

        {/* =================== FORM BODY - START =================== */}
        <div className="h-auto py-[10px] flex justify-between md:flex-row flex-col-reverse w-full gap-[15px] md:items-stretch items-center">
          <div className="h-auto f-c-between md:items-stretch items-center md:w-[50%] w-full xs:gap-[15px] gap-[5px]">
            <div className="flex gap-[20px] items-center">
              <input
                placeholder="Blog name"
                type="text"
                id="title"
                defaultValue={existingBlog?.title}
                className={`outline-none bg-gray-100 xs:px-[10px] px-[5px] xs:py-[5px] py-[2px] rounded-md border-[2px] border-gray-200 xs:w-auto w-full xs:text-[16px] text-[14px] ${
                  errors.title
                    ? "focus:border-red-300"
                    : "focus:border-yellow-300"
                }`}
                {...register("title", {
                  required: "please enter a name",
                })}
              />
            </div>
            {errors.title && (
              <p className="form_error">{errors.title.message}</p>
            )}
            <div className="flex flex-col gap-[20px] md:w-auto max-w-[450px] w-[95%]">
              <textarea
                type="text"
                id="content"
                name="content"
                placeholder="Give your content here"
                defaultValue={existingBlog?.content}
                className={`outline-none bg-gray-100 xs:p-[10px] p-[5px] rounded-md border-[2px] border-gray-200 xs:text-[16px] text-[14px] resize-none xs:h-[130px] h-[110px] ${
                  errors.content
                    ? "focus:border-red-300"
                    : "focus:border-yellow-300"
                } `}
                {...register("content", {
                  required: "please enter the content",
                  maxLength: { value: 5000, message: "Maximum 1000 character" },
                })}
              />
            </div>
            {errors.content && (
              <p className="form_error">{errors.content.message}</p>
            )}
            <button
              className="px-[20px] xs:py-[5px] py-[3px] rounded-md bg-blue-500 xs:w-max border-[5px] w-full borser-gray-100 text-white xs:text-[16px] text-[14px] hover:bg-blue-700"
              type="submit"
            >
              {!blogid ? "Post" : "Save changes"}
            </button>
          </div>

          <div className="md:w-[50%] max-w-[450px] w-[95%] aspect h-[auto] flex flex-col xs:justify-between gap-[10px]">
            <div
              className={`bg-gray-200 w-full md:h-[250px] xs:h-[180px] h-[45vw] rounded-lg overflow-hidden flex flex-col justify-center border-[2px] border-gray-200 
               ${errors.image && "border-red-300"}
              `}
            >
              {!addedImage && !existingBlog?.image ? (
                <p
                  className={`text-center bg-transparent text-[12px] xs:text-[16px] ${
                    errors.image && "text-red-500"
                  }`}
                >
                  Please insert an image
                </p>
              ) : (
                <img
                  src={addedImage ?? existingBlog?.image}
                  alt="Blog view"
                  className="object-cover"
                />
              )}
            </div>
            <Filebase
              type="file"
              onDone={({ base64 }) => processImage(base64)}
              // ref={register}
              {...register("image", {
                required: "Please insert an image",
              })}
              className="text-[5px]"
            />
          </div>
        </div>
        {/* =================== FORM BODY - END =================== */}
      </form>
    </div>
  );
};

export default Form;
