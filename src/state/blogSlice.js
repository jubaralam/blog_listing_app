import { createSlice } from "@reduxjs/toolkit";
import { blogs } from "../utils/data";

const initialState = {
  blogs: blogs,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    addBlog: (state, action) => {
      console.log(action);
      state.blogs = action.payload;
    },
  },
});

export const { addBlog } = blogSlice.actions;

export default blogSlice.reducer;
