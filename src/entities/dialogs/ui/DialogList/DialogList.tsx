import { useEffect, useRef, useState } from "react";

import { useStoreDispatch, useStoreSelector } from "shared/lib/utils";
import DialogItem from "../DialogItem";
import { getMessagesData } from "../../model/dialogsSelectors";
import {
  startMessagesListening,
  stopMessagesListening,
} from "../../model/dialogsSlice";

import s from "./DialogsList.module.scss";

const DialogList = () => {
  const dispatch = useStoreDispatch();
  const messagesData = useStoreSelector(getMessagesData);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(startMessagesListening());

    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isAutoScroll) {
      scrollRef.current?.scrollIntoView(true);
    }
  }, [isAutoScroll]);

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>): void => {
    const { scrollHeight, scrollTop, clientHeight } = event.currentTarget;

    if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
      if (!isAutoScroll) {
        setIsAutoScroll(true);
      } else {
        setIsAutoScroll(false);
      }
    }
  };

  return (
    <div className={s.DialogsList} onScroll={scrollHandler}>
      {messagesData.length ? (
        <ul className={s.DialogsList__List}>
          {messagesData.map((message, index) => (
            <DialogItem key={`${message.userId}-${index}`} {...message} />
          ))}
          <div ref={scrollRef} />
        </ul>
      ) : (
        <div className={s.DialogsList__WrapperText}>
          <h2 className={s.DialogsList__NotMessageText}>
            Message history is empty
          </h2>
        </div>
      )}
    </div>
  );
};

export default DialogList;
