import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Post } from "./types";

export interface PostsState {
  postsData: Post[];
}

const initialState: PostsState = {
  postsData: [
    {
      id: "1",
      message: "Hi, how are you?",
      countLikes: 12,
    },
    {
      id: "2",
      message: "It is second post!",
      countLikes: 18,
    },
    {
      id: "3",
      message: "Hi, how are you?",
      countLikes: 2,
    },
    {
      id: "4",
      message: "It is second post!",
      countLikes: 19,
    },
    {
      id: "5",
      message: "Hi, how are you?",
      countLikes: 34,
    },
    {
      id: "6",
      message: "It is second post!",
      countLikes: 45,
    },
  ],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setNewPost: (state, action: PayloadAction<string>) => {
      const newPost: Post = {
        id: "7",
        message: action.payload,
        countLikes: 17,
      };
      state.postsData.unshift(newPost);
    },
  },
});

export const { setNewPost } = postsSlice.actions;

export default postsSlice.reducer;
