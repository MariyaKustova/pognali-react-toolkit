import React, { FC } from "react";

import s from "./Modal.module.scss";

interface ModalProps {
  title: string;
  message: string;
  onClick?: () => void;
}

const Modal: FC<ModalProps> = ({ title, message, onClick }) => {
  return (
    <div className={s.Modal} onClick={onClick}>
      <div className={s.Modal__Content}>
        <h1>{title}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Modal;
