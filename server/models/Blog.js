import mongoose from "mongoose";

const BlogModel = mongoose.Schema(
  {
    authName: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    likesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogModel);

export default Blog;
