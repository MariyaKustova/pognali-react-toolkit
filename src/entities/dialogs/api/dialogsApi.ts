import { Nullable } from "shared/model/types";
import { EVENT_TYPE_WS, SubscriberType } from "../model/types";

let subscribers = [] as SubscriberType[];

let wss: Nullable<WebSocket> = null;

const closeHandler = () => {
  setTimeout(createChannel, 3000);
};

const messageHandler = (evt: MessageEvent) => {
  subscribers.forEach((subscriber) => subscriber(JSON.parse(evt.data)));
};

const createChannel = () => {
  wss = new WebSocket(
    "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
  );

  wss.addEventListener(EVENT_TYPE_WS.CLOSE, closeHandler);
  wss.addEventListener(EVENT_TYPE_WS.MESSAGE, messageHandler);
};

export const dialogsAPI = {
  openConnection() {
    createChannel();
  },
  subscribe(callback: SubscriberType) {
    subscribers.push(callback);
  },
  closeConnection() {
    if (wss) {
      wss.close();
      wss.removeEventListener(EVENT_TYPE_WS.CLOSE, closeHandler);
      wss.removeEventListener(EVENT_TYPE_WS.MESSAGE, messageHandler);
      subscribers = [];
    }
  },
  unsubscribe(callback: SubscriberType) {
    subscribers.filter((subscriber) => subscriber !== callback);
  },
  sendMessage(message: string) {
    wss?.send(message);
  },
};
