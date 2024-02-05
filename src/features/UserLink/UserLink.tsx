import React, { FC } from "react";
import { Link } from "react-router-dom";

import { ROUTE_PATH } from "shared/lib/constants";
import { UserIcon } from "shared/assets";

import s from "./UserLink.module.scss";

interface UserLinkProps {
  photoSrc?: string;
  fullName?: string;
}

const UserLink: FC<UserLinkProps> = ({
  photoSrc = UserIcon,
  fullName = "",
}) => {
  return (
    <Link to={`${ROUTE_PATH.PROFILE}`}>
      <div className={s.UserLink}>
        <img
          className={s.UserLink__Img}
          src={photoSrc}
          alt="Аватар пользователя"
        />
        <span className={s.UserLink__Text}>{fullName}</span>
      </div>
    </Link>
  );
};

export default UserLink;
