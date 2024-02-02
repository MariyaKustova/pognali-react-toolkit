import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import { ROUTE_PATH } from "shared/lib/constants";
import { MessageItem } from "entities/dialogs/model/types";

import s from "./DialogItem.module.scss";

const DialogItem: FC<MessageItem> = ({ userId, userName, message, photo }) => {
  return (
    <li className={s.DialogItem__Dialog}>
      <NavLink
        className={({ isActive }) =>
          isActive ? s.DialogItem__LinkActive : s.DialogItem__Link
        }
        to={`${ROUTE_PATH.PROFILE}/${userId}`}
      >
        <img className={s.DialogItem__Img} src={photo} alt="Аватар" />
        {userName}
      </NavLink>
      <span className={s.DialogItem__messageText}>{message}</span>
    </li>
  );
};

export default DialogItem;
