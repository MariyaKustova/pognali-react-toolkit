import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MessageItem {
  userId: number,
  userName: string,
  message: string,
  photo: string,
}

const initialState: MessageItem[] = [];

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    setNewMessage: (state, action: PayloadAction<MessageItem[]>) => {
      state.push(...action.payload);
    },
  },
});

export const { setNewMessage } = dialogsSlice.actions;

export default dialogsSlice.reducer;
