import express from "express";
import {
  getBlogs,
  createBlog,
  deleteBlog,
  likeBlog,
  updateBlog,
  addNewUser,
  loginUser,
  logoutUser,
} from "../server/controllers.js";

const router = express.Router();

router.get("/:email", getBlogs);

router.post("/", createBlog);
router.patch("/:id", updateBlog);
router.patch("/:id/likeblog", likeBlog);

router.delete("/:id", deleteBlog);

router.post("/register", addNewUser);
router.patch("/login/:email", loginUser);
router.patch("/logout/:email", logoutUser);

export default router;
