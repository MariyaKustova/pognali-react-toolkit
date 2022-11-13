import React, { FC } from "react";

import ProfileStatus from "../ProfileStatus/ProfileStatus";
import SmartLink from "../../../../components/common/SmartImgLink/SmartImgLink";
import { getIcon } from "../../helpers";
import { UserProfile } from "../../types";

import s from "../../Profile.module.scss";

const ProfileInfo: FC<UserProfile> = ({
  userId,
  aboutMe,
  lookingForAJob,
  lookingForAJobDescription,
  fullName,
  contacts,
}) => {
  return (
    <div className={s.Profile__Wrapper}>
      <div className={s.Profile__Header}>
        <div className={s.Profile__ShortInfo}>
          <h2>{fullName || "Здесь будет имя пользователя"}</h2>
          <p>id: {userId || "-"}</p>
          <ProfileStatus />
        </div>
        {lookingForAJob && (
          <div className={s.Profile__Job}>
            <img
              className={s.Profile__JobIcon}
              src="https://img.icons8.com/fluency/344/find-matching-job.png"
              alt="Иконка - активный поиск работы"
            />
            <p className={s.Profile__JobDescription}>
              {lookingForAJobDescription}
            </p>
          </div>
        )}
      </div>
      <div className={s.Profile__Info}>
        <div className={s.Profile__About}>
          <h4>About me...</h4>
          <p>{aboutMe || "-"}</p>
        </div>
        <div className={s.Profile__Contacts}>
          <ul>
            {Object.entries(contacts).map(([key, value]) => (
              <li key={key}>
                <SmartLink
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
