import React, { FC } from "react";
import { UserIcon } from "shared/assets";

import s from "./ProfileImg.module.scss";

interface ProfileImgProps {
  photoSrc?: string;
  editImgBtn?: React.ReactNode;
}

const ProfileImg: FC<ProfileImgProps> = ({ photoSrc, editImgBtn = <></> }) => {
  return (
    <div className={s.ProfileImg}>
      <img
        className={s.ProfileImg__Photo}
        src={photoSrc || UserIcon}
        alt="Фотография пользователя"
      />
      {editImgBtn}
    </div>
  );
};

export default ProfileImg;
