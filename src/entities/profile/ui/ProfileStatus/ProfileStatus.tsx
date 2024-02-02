import React, { useCallback, useEffect, useState } from "react";
import classnames from "classnames";

import { useStoreDispatch, useStoreSelector } from "shared/lib/utils";
import { BaseInput } from "shared/ui";
import { getProfileState } from "../../model/profileSelectors";
import { updateUserStatus } from "../../model/profileSlice";

import s from "./ProfileStatus.module.scss";

const ProfileStatus = ({ isOwner }: { isOwner: boolean }) => {
  const dispatch = useStoreDispatch();

  const { status } = useStoreSelector(getProfileState);

  const [userStatus, setUserStatus] = useState<string>(status);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    setUserStatus(status);
  }, [status]);

  const onToggleEditMode = useCallback(() => {
    setEditMode((prevState) => !prevState);
  }, []);

  const onChangeStatus = useCallback(() => {
    dispatch(updateUserStatus(userStatus));
    onToggleEditMode();
  }, [dispatch, onToggleEditMode, userStatus]);

  return (
    <div
      className={classnames(s.ProfileStatus, {
        [s.ProfileStatus__Owner]: isOwner,
      })}
    >
      {editMode && isOwner ? (
        <div className={s.ProfileStatus__Modal}>
          <span className={s.ProfileStatus__Hint}>Введите ваш статус</span>
          <BaseInput
            value={userStatus}
            onBlur={onChangeStatus}
            onChange={(e) => setUserStatus(e.target.value)}
            className={s.ProfileStatus__input}
          />
        </div>
      ) : (
        <div onClick={onToggleEditMode}>
          {status || "Установите ваш статус"}
        </div>
      )}
    </div>
  );
};

export default ProfileStatus;
