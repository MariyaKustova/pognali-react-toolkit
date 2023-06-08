import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import DialogForm from "./components/DialogForm/DialogForm";
import DialogList from "./components/DialogList/DialogList";
import { State } from "../../redux/reduxStore";
import { getMessagesData } from "../../redux/selectors.ts/dialogsSelectors";
import { setNewMessage } from "../../redux/slices/dialogsSlice";

import s from './Dialogs.module.scss';


const wss = new WebSocket(
  "wss://social-network.samuraijs.com/handlers/ChatHandler.ashx"
);

const Dialogs = () => {
  const dispatch = useDispatch();
  const messagesData = useSelector((state: State) => getMessagesData(state));

  useEffect(() => {
    const messageHandler = (evt: MessageEvent) => dispatch(setNewMessage(JSON.parse(evt.data)));
    wss.addEventListener("message", messageHandler);

    return () => wss.removeEventListener("message", messageHandler);
  }, [dispatch]);

  const onSubmit = useCallback((value: string) => {
    if (!value) {
      return;
    }
    wss.send(value);    
  }, []);  

  return (
    <div className={s.Dialogs}>
      <DialogList className={s.Dialogs__List} messagesData={messagesData} />
      <DialogForm className={s.Dialogs__Form} onSubmit={onSubmit} disabled={wss.readyState !== WebSocket.OPEN}/>
    </div>
  );
};

export default Dialogs;
