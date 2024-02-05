import React, { FC } from "react";

import ProfileStatus from "../ProfileStatus";
import { getIcon } from "../../lib/helpers";
import { ProfileInfoProps } from "../../model/types";
import { SmartImgLink } from "shared/ui";

import s from "./ProfileInfo.module.scss";

const ProfileInfo: FC<ProfileInfoProps> = ({
  userId,
  aboutMe,
  lookingForAJob,
  lookingForAJobDescription,
  fullName,
  contacts,
  isOwner,
}) => {
  return (
    <div className={s.ProfileInfo__Wrapper}>
      <div className={s.ProfileInfo__Header}>
        <div className={s.ProfileInfo__ShortInfo}>
          <h2>{fullName || "Здесь будет имя пользователя"}</h2>
          <p>id: {userId || "-"}</p>
          <ProfileStatus isOwner={isOwner} />
        </div>
        {lookingForAJob && (
          <div className={s.ProfileInfo__Job}>
            <img
              className={s.ProfileInfo__JobIcon}
              src="https://img.icons8.com/fluency/344/find-matching-job.png"
              alt="Иконка - активный поиск работы"
            />
            <p className={s.ProfileInfo__JobDescription}>
              {lookingForAJobDescription}
            </p>
          </div>
        )}
      </div>
      <div className={s.ProfileInfo__Info}>
        <div className={s.ProfileInfo__About}>
          <h4>About me...</h4>
          <p>{aboutMe || "-"}</p>
        </div>
        <div className={s.ProfileInfo__Contacts}>
          <ul>
            {Object.entries(contacts).map(([key, value]) => (
              <li key={key}>
                <SmartImgLink
                  url={value}
                  title={key.toUpperCase()}
                  src={getIcon(key)}
                  alt={`Иконка ${key}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
