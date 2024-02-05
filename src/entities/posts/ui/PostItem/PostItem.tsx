import React, { FC } from "react";

import s from "./PostItem.module.scss";

interface PostItemProps {
  photoSrc: string;
  message: string;
  countLikes: number;
}

const PostItem: FC<PostItemProps> = ({ photoSrc, message, countLikes }) => {
  return (
    <li className={s.Post}>
      <div className={s.Post__Content}>
        <img className={s.Post__Img} src={photoSrc} alt="Аватар" />
        <span>{message}</span>
      </div>
      <div className={s.Post__Like}>like: {countLikes}</div>
    </li>
  );
};

export default PostItem;
