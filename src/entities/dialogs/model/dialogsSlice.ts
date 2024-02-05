import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";

import { dialogsAPI } from "../api/dialogsApi";
import { DialogState, MessageItem } from "./types";
import { Nullable } from "shared/model/types";
import { setErrors } from "entities/errors";

const initialState: DialogState = { dialogMessages: [] };

let newMesageHandler: Nullable<(messages: MessageItem[]) => void> = null;

const newMesageHandlerCreator = (dispatch: Dispatch) => {
  if (!newMesageHandler) {
    newMesageHandler = (messages: MessageItem[]) =>
      dispatch(dialogsSlice.actions.messagesReceived(messages));
  }
  return newMesageHandler;
};

export const startMessagesListening = createAsyncThunk<
  void,
  void,
  { dispatch: RootDispatch }
>("dialogs/startMessagesListening", async function (_, { dispatch }) {
  try {
    dialogsAPI.openConnection();
    dialogsAPI.subscribe(newMesageHandlerCreator(dispatch));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setErrors(error.message));
    }
  }
});

export const stopMessagesListening = createAsyncThunk<
  void,
  void,
  { dispatch: RootDispatch }
>("dialogs/stopMessagesListening", async function (_, { dispatch }) {
  try {
    dialogsAPI.unsubscribe(newMesageHandlerCreator(dispatch));
    dispatch(dialogsSlice.actions.messagesClear());
    dialogsAPI.closeConnection();
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setErrors(error.message));
    }
  }
});
export const sendMessage = createAsyncThunk<
  void,
  string,
  { dispatch: RootDispatch }
>("dialogs/sendMessage", async function (message, { dispatch }) {
  try {
    dialogsAPI.sendMessage(message);
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setErrors(error.message));
    }
  }
});

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    messagesReceived: (state, action: PayloadAction<MessageItem[]>) => {
      state.dialogMessages.push(...action.payload);
    },
    messagesClear: (state, action: PayloadAction<undefined>) => {
      state.dialogMessages = [];
    },
  },
});

export default dialogsSlice.reducer;
