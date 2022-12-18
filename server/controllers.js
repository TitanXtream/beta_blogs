import express from "express";
import Blog from "./models/Blog.js";
import mongoose from "mongoose";
import User from "./models/User.js";
import bcryptjs from "bcryptjs";
import db from "./db.js";

const router = express.Router();

//////////::::::::::::::::::> GETTIN ALL BLOGS-Start <:::::::::::::::::://////////

export const getBlogs = async (req, res) => {
  await db.connect();

  const { email } = await req.params;
  try {
    const auth = await User.findOne({ email });
    if (!auth) throw new Error(email);

    const AllBlogs = await Blog.find().lean();
    res.status(200).json(AllBlogs);
  } catch (err) {
    console.log(`<><><>---${err.message}---<><><>`);
    res.status(404).json({ message: err.message });
  }
  // db.disconnect();
};
///::::::::::::::::::> GETTIN ALL BLOGS-END <:::::::::::::::::://///

//////////::::::::::::::::::> creat-Start <:::::::::::::::::://////////

export const createBlog = async (req, res) => {
  await db.connect();
  const { title, content, image, authName } = req.body;

  if (!authName || !title || !content || !image) {
    return res.status(401).json("-- INVALID INPUT --");
  }

  const newBlog = new Blog({
    authName,
    title,
    content,
    image,
  });

  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    console.log(`<><><>---${err.message}---<><><>`);

    res.status(409).json({ message: err.message });
  }
  // db.disconnect();
};
///::::::::::::::::::> creat-END <:::::::::::::::::://///

//////////::::::::::::::::::> Updating-Start <:::::::::::::::::://////////
export const updateBlog = async (req, res) => {
  await db.connect();
  const { id } = req.params;
  const { title, content, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatingBlog = await Blog.findById(id).lean();
  const updatedBlog = {
    ...updatingBlog,
    title,
    content,
    image,
  };

  await Blog.findByIdAndUpdate(id, updatedBlog, { new: true });
  res.status(200).json(updatedBlog);
};
///::::::::::::::::::> Updating-END <:::::::::::::::::://///

//////////::::::::::::::::::> Deleting-Start <:::::::::::::::::://////////

export const deleteBlog = async (req, res) => {
  await db.connect();
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await Blog.findByIdAndRemove(id);
  res.status(200).json("Blog deleted successfully");
  // db.disconnect();
};
///::::::::::::::::::> Deleting-END <:::::::::::::::::://///

//////////::::::::::::::::::> Liking-Start <:::::::::::::::::://////////

export const likeBlog = async (req, res) => {
  await db.connect();
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const likedBlog = await Blog.findById(id);

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    { likesCount: likedBlog.likesCount + 1 },
    { new: true }
  );

  res.status(200).json(updatedBlog);
  // db.disconnect();
};

///::::::::::::::::::> Liking-END <:::::::::::::::::://///

//////////::::::::::::::::::> Auth-Start <:::::::::::::::::://////////
export const addNewUser = async (req, res) => {
  const { name, password, email } = req.body;

  if (!name || !email || !email.includes("@" && ".com") || !password) {
    res.status(422).json({
      message: "Validation error",
    });
    return;
  }
  await db.connect();
  const existingUserByEmail = await User.findOne({ email });
  const existingUserByName = await User.findOne({ name });
  if (existingUserByName) {
    res.status(422).json({ message: "Username already taken!" });
    return;
  }
  if (existingUserByEmail) {
    res.status(422).json({ message: "Email already signed in!" });
    return;
  }
  const newUser = new User({
    name,
    email,
    password: bcryptjs.hashSync(password),
    isAdmin: false,
  });
  const user = await newUser.save();
  res.status(201).json({
    message: "Created user!",
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  db.disconnect();
};

export const loginUser = async (req, res) => {
  await db.connect();
  const { email } = req.params;
  const { password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).json({ message: "User not found" });
  }

  const checkPassword = await bcryptjs.compare(password, user.password);

  if (!checkPassword) {
    res.status(422).json({ message: "Incorrect Password" });
    return;
  }

  const admin = await User.findByIdAndUpdate(
    user.id,
    { isAuth: true },
    { new: true }
  );

  res.status(200).json({
    name: admin.name,
    email: admin.email,
  });
};

export const logoutUser = async (req, res) => {
  await db.connect();
  const { email } = req.params;

  const userVarify = await User.findOne({ email });

  if (!userVarify) {
    res.status(422).send({ message: "Something went wrong" });
    return;
  }

  const user = await User.findOneAndUpdate(
    { email },
    { isAuth: false },
    { new: true }
  );

  res.status(200).json({ message: "Logged out successfully" });
  db.disconnect();
};
///::::::::::::::::::> Auth-END <:::::::::::::::::://///

export default router;
//$2a$10$jZRUF5g.zIt3MHGzfD3Ttu2XX5zVk.PabF/zr4Gps6aauavNt6D6O
