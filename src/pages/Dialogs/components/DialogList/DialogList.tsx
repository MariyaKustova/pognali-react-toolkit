import { FC, useEffect, useRef, useState } from "react";

import DialogItem from "../DialogItem/DialogItem";
import { MessageItem } from "../../../../redux/slices/dialogsSlice";

import s from "./DialogsList.module.scss";

interface DialogListProps {
  messagesData: MessageItem[];
  className? : string;
}

const DialogList: FC<DialogListProps> = ({ messagesData, className }) => {
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAutoScroll) {
      scrollRef.current?.scrollIntoView(true);
    }    
  }, [messagesData, isAutoScroll])

  const scrollHandler = (event: React.UIEvent<HTMLDivElement>): void => {
    const {scrollHeight, scrollTop, clientHeight} = event.currentTarget;

    if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
      if (!isAutoScroll) {
        setIsAutoScroll(true);
      } else {
        setIsAutoScroll(false);
      }
    } 
  }
  
  return (
    <div className={className} onScroll={scrollHandler}>
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
