import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import { ROUTE_PATH } from "shared/lib/constants";
import { User } from "shared/model/types";
import { UserIcon } from "shared/assets";

import s from "./UserItem.module.scss";

interface UserItemProps extends User {
  followBtn: React.ReactNode;
}

const UserItem: FC<UserItemProps> = ({
  id,
  name,
  photos,
  location,
  status,
  followBtn,
}) => {
  return (
    <div className={s.UserItem}>
      <NavLink className={s.UserItem__Link} to={`${ROUTE_PATH.PROFILE}/${id}`}>
        <div className={s.UserItem__ShortInfo}>
          <div className={s.UserItem__Wrapper}>
            <img
              className={s.UserItem__Img}
              src={photos.small ?? UserIcon}
              alt="Аватар пользователя"
            />
            {followBtn}
          </div>
          <div>
            <h3 className={s.UserItem__Name}>{name}</h3>
            <p className={s.UserItem__Text}>
              {status ?? "Очень скоро здесь появится статус"}
            </p>
          </div>
        </div>
        <div className={s.UserItem__Location}>
          <p className={s.UserItem__Text}>
            {location?.country ?? "Страна не указана"}
          </p>
          <p className={s.UserItem__Text}>
            {location?.city ?? "Город не указан"}
          </p>
        </div>
      </NavLink>
    </div>
  );
};

export default UserItem;
