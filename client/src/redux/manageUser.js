import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    defineUser(state, action) {
      state.user = { ...action.payload };
    },
    clearUser(state) {
      state.user = undefined;
      //   localStorage.removeItem("isLoggedIn");
      //   state = { ...initialState };
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
