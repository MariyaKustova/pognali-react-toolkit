import React, { FC } from "react";

import { logoutUser } from "entities/auth";
import { logoutOAuthUser } from "entities/oAuth";
import { useStoreDispatch } from "shared/lib/utils";

import s from "./LogoutBtn.module.scss";

interface LogoutBtnProps {
  fromGoogle?: boolean;
}

const LogoutBtn: FC<LogoutBtnProps> = ({ fromGoogle }) => {
  const dispatch = useStoreDispatch();

  const onClick = () => {
    fromGoogle ? dispatch(logoutOAuthUser()) : dispatch(logoutUser());
  };

  return (
    <button className={s.LogoutBtn} onClick={onClick}>
      Log out
    </button>
  );
};

export default LogoutBtn;
