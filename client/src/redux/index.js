import { configureStore } from "@reduxjs/toolkit";
import blogManager from "./manageBlogs";
import authManager from "./manageUser";

const store = configureStore({
  reducer: {
    blogManager,
    authManager,
  },
});

export default store;
