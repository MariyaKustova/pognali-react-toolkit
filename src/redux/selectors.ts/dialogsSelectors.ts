import { State } from "../reduxStore";

export const getMessagesData = (state: State) => state.dialogs.dialogMessages;
