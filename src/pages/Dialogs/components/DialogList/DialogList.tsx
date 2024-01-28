import { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import DialogItem from "../DialogItem/DialogItem";
import { State } from "../../../../redux/reduxStore";
import { getMessagesData } from "../../../../redux/selectors.ts/dialogsSelectors";

import s from "./DialogsList.module.scss";

interface DialogListProps {
  className?: string;
}

const DialogList: FC<DialogListProps> = ({ className }) => {
  const messagesData = useSelector((state: State) => getMessagesData(state));
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const scrollRef = useRef<HTMLDivElement>(null);

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
