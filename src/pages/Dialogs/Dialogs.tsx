import React, { useCallback, useEffect } from "react";

import DialogForm from "./components/DialogForm/DialogForm";
import DialogList from "./components/DialogList/DialogList";
import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from "../../redux/slices/dialogsSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/reduxStore";

import s from "./Dialogs.module.scss";

const Dialogs = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  const onSubmit = useCallback(
    (value: string) => {
      if (!value) {
        return;
      }
      dispatch(sendMessage(value));
    },
    [dispatch]
  );

  return (
    <div className={s.Dialogs}>
      <DialogList className={s.Dialogs__List} />
      <DialogForm
        className={s.Dialogs__Form}
        onSubmit={onSubmit}
        disabled={false}
      />
    </div>
  );
};

export default Dialogs;
