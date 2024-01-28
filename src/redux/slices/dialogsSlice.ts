import {
  createAsyncThunk,
  createSlice,
  Dispatch,
  PayloadAction,
} from "@reduxjs/toolkit";
import { dialogsAPI, MessageItem } from "../API/dialogs";
import { AppDispatch } from "../reduxStore";
import { setAppErrors } from "./appSlice";

export interface DialogState {
  dialogMessages: MessageItem[];
}

const initialState: DialogState = { dialogMessages: [] };

let newMesageHandler: ((messages: MessageItem[]) => void) | null = null;

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
  { dispatch: AppDispatch }
>("dialogs/startMessagesListening", async function (_, { dispatch }) {
  try {
    dialogsAPI.openConnection();
    dialogsAPI.subscribe(newMesageHandlerCreator(dispatch));
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setAppErrors(error.message));
    }
  }
});

export const stopMessagesListening = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch }
>("dialogs/stopMessagesListening", async function (_, { dispatch }) {
  try {
    dialogsAPI.unsubscribe(newMesageHandlerCreator(dispatch));
    dialogsAPI.closeConnection();
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setAppErrors(error.message));
    }
  }
});
export const sendMessage = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch }
>("dialogs/sendMessage", async function (message, { dispatch }) {
  try {
    dialogsAPI.sendMessage(message);
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setAppErrors(error.message));
    }
  }
});

const dialogsSlice = createSlice({
  name: "dialogs",
  initialState,
  reducers: {
    messagesReceived: (state, action: PayloadAction<MessageItem[]>) => {
      console.log(state.dialogMessages);

      state.dialogMessages.push(...action.payload);
    },
  },
});

export default dialogsSlice.reducer;
