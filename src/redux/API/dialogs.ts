export interface MessageItem {
  userId: number;
  userName: string;
  message: string;
  photo: string;
}

type SubscriberType = (messages: MessageItem[]) => void;

export enum EVENT_TYPE_WS {
  OPEN = "open",
  CLOSE = "close",
  MESSAGE = "message",
}

let subscribers = [] as SubscriberType[];

let wss: WebSocket | null = null;

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
