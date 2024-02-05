export interface MessageItem {
  userId: number;
  userName: string;
  message: string;
  photo: string;
}

export type SubscriberType = (messages: MessageItem[]) => void;

export enum EVENT_TYPE_WS {
  OPEN = "open",
  CLOSE = "close",
  MESSAGE = "message",
}

export interface DialogState {
  dialogMessages: MessageItem[];
}

export interface DialogFormValues {
  newMessage: string;
}
