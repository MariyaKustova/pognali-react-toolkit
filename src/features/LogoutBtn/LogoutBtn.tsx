import React from "react";

import { logoutUser } from "entities/auth";
import { useStoreDispatch } from "shared/lib/utils";

import s from "./LogoutBtn.module.scss";

const LogoutBtn = () => {
  const dispatch = useStoreDispatch();

  const onClick = () => {
    dispatch(logoutUser());
  };

  return (
    <button className={s.LogoutBtn} onClick={onClick}>
      Log out
    </button>
  );
};

export default LogoutBtn;
