import React, { useEffect } from "react";

import { useStoreDispatch, useStoreSelector } from "shared/lib/utils";
import { getGoogleProfile } from "../../model/googleProfileSlice";
import { getGoogleProfileState } from "entities/profileGoogle/model/googleProfileSelectors";
import { descriptionProfileFields } from "../../lib/constants";
import { ProfileImg } from "shared/ui";
import { LogoutBtn } from "features";

import s from "./ProfileGoogle.module.scss";

const ProfileGoogle = () => {
  const dispatch = useStoreDispatch();
  const googleProfile = useStoreSelector(getGoogleProfileState);

  useEffect(() => {
    dispatch(getGoogleProfile());
  }, [dispatch]);

  return (
    <div className={s.ProfileGoogle}>
      <div className={s.ProfileGoogle__Container}>
        <ProfileImg />
        <div>
          {descriptionProfileFields.map(({ label, fieldName, isBoolean }) => (
            <div key={label} className={s.ProfileGoogle__Row}>
              <div className={s.ProfileGoogle__Label}>{label}</div>
              <div className={s.ProfileGoogle__Value}>
                {isBoolean
                  ? googleProfile?.[fieldName].toString()
                  : googleProfile?.[fieldName]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={s.ProfileGoogle__Wrapper}>
        <LogoutBtn fromGoogle />
      </div>
    </div>
  );
};

export default ProfileGoogle;
