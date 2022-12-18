import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: [],
  blogsCount: 0,
};

const blogsSlice = createSlice({
  name: "blogsSlice",
  initialState,
  reducers: {
    addBlog(state, action) {
      const newBlogArr = [...state.allBlogs, action.payload];
      state.allBlogs = newBlogArr;
      state.blogsCount = newBlogArr.length + 1;
    },

    removeBlog(state, action) {
      const newSortedBlogArr = state.allBlogs.filter(
        (blog) => blog._id !== action.payload
      );
      state.allBlogs = newSortedBlogArr;
      state.blogsCount = newSortedBlogArr.length;
    },

    updateThisBlog(state, action) {
      const updatingBlogIndex = state.allBlogs.findIndex(
        (blog) => blog._id === action.payload._id
      );
      state.allBlogs[updatingBlogIndex] = action.payload;
    },

    setAllBlogs(state, action) {
      state.allBlogs = action.payload;
      state.blogsCount = state.allBlogs.length;
    },

    likeThiBlog(state, action) {
      const likedBlogIndex = state.allBlogs.findIndex(
        (blog) => blog._id === action.payload
      );
      state.allBlogs[likedBlogIndex].likesCount++;
    },
  },
});

export const blogAction = blogsSlice.actions;
export default blogsSlice.reducer;
