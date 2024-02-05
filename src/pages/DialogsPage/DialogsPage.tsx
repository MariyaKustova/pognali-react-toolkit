import React from "react";

import { DialogForm, DialogList } from "entities/dialogs";

import s from "./DialogsPage.module.scss";

const DialogsPage = () => {
  return (
    <div className={s.DialogsPage}>
      <DialogList />
      <DialogForm className={s.DialogsPage__Form} />
    </div>
  );
};

export default DialogsPage;
