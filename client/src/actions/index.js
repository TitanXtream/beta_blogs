import axios from "axios";
import { toast } from "react-toastify";
import { blogAction } from "../redux/manageBlogs";
import { authAction } from "../redux/manageUser";
import Cookie from "js-cookie";

export const BASE_URL = "http://localhost:5000";

export const getAllBlogs = (email) => async (dispatch) => {
  try {
    const allBlogs = await axios.get(`${BASE_URL}/${email}`);

    await dispatch(blogAction.setAllBlogs(allBlogs.data));
  } catch (err) {
    // console.error(`<><><>---${err.response.data.message}---<><><>`);
    toast.error(err?.response?.data?.message);
  }
};

export const createBlog = (newBlog) => async (dispatch) => {
  try {
    const resp = await axios.post(BASE_URL, newBlog);

    await dispatch(blogAction.addBlog(resp.data));

    toast.success("Blog added successfully");
  } catch (err) {
    toast.error(err?.response?.data?.message);
    // console.error(`<><><>---${err?.response?.data?.message}---<><><>`);
  }
};

export const updateBlog = (blog) => async (dispatch) => {
  try {
    const resp = await axios.patch(`${BASE_URL}/${blog._id}`, blog);
    if (resp.status === 404) throw new Error(resp);

    await dispatch(blogAction.updateThisBlog(resp.data));
    toast.success("Blog updated successfully");
  } catch (err) {
    // console.error(`<><><>--${err?.response?.data?.message}--<><><>`);
    toast.error(err?.response?.data?.message);
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    const resp = await axios.delete(`${BASE_URL}/${id}`);
    if (resp.status === 404) throw new Error(resp);

    await dispatch(blogAction.removeBlog(id));
    toast.success("Deleted successfully");
  } catch (err) {
    // console.error(`<><><>--${err?.response?.data?.message}--<><><>`);
    toast.error(err?.response?.data?.message);
  }
};

export const likeBlog = (id) => async (dispatch) => {
  try {
    dispatch(blogAction.likeThiBlog(id));
    const resp = await axios.patch(`${BASE_URL}/${id}/likeblog`);
    if (resp.status === 404) throw new Error(resp);
  } catch (err) {
    // console.error(`<><><>--${err?.response?.data?.message}--<><><>`);
    toast.error(err?.response?.data?.message);
  }
};

//////////##################> Auth-Start <##################//////////
export const login = (user) => async (dispatch) => {
  try {
    const resp = await axios.patch(`${BASE_URL}/login/${user.email}`, user);

    Cookie.set(
      "blogger",
      JSON.stringify({
        ...resp.data,
      })
    );

    await dispatch(authAction.defineUser(resp.data));

    // toast.success(`Welcome ${resp?.data?.name}`);
  } catch (err) {
    toast.error(err?.response?.data?.message);
    throw new Error(err?.response?.data?.message);
    // console.log(`<><><>--${err?.response?.data?.message}--<><><>`);
  }
};

export const logout = (user) => async (dispatch) => {
  try {
    const resp = await axios.patch(`${BASE_URL}/logout/${user.email}`, user);
    if (resp.status === 422) throw new Error(resp);

    await dispatch(authAction.clearUser());

    Cookie.remove("blogger");

    toast.success(resp?.data?.message);
  } catch (err) {
    // console.error(`<><><>--${err?.response?.data?.message}--<><><>`);
    toast.error(err?.response?.data?.message);
  }
};

export const register = (user) => async (dispatch) => {
  try {
    const resp = await axios.post(`${BASE_URL}/register`, user);

    toast.success(`Hi ${resp?.data?.name}`);
  } catch (err) {
    // console.error(`<><><>--${err?.response?.data?.message}--<><><>`);
    toast.error(err?.response?.data?.message);
    throw new Error(err?.response?.data?.message);
  }
};
/////################> Auth-END <################/////
