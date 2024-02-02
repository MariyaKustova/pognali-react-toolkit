import React, { FC } from "react";

import { EditIcon } from "shared/assets";

import s from "./ProfileEditButton.module.scss";

interface ProfileEditButtonProps {
  onClick: () => void;
}

const ProfileEditButton: FC<ProfileEditButtonProps> = ({ onClick }) => {
  return (
    <div className={s.ProfileEditButton}>
      <button
        className={s.ProfileEditButton__ButtonEdit}
        onClick={() => onClick()}
      >
        <img
          className={s.ProfileEditButton__IconEdit}
          src={EditIcon}
          alt="Редактирование профиля"
        />
      </button>
      <div className={s.ProfileEditButton__Tooltip}>Editing profile</div>
    </div>
  );
};

export default ProfileEditButton;
