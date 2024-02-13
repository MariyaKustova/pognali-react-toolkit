import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ROUTE_PATH } from "shared/lib/constants";
import { ErrorAlert, Loader, ProfileImg } from "shared/ui";
import { PostForm, PostsList } from "entities/posts";
import {
  ProfileEditButton,
  ProfileFormValues,
  ProfileInfo,
  ProfileInfoForm,
  getProfile,
  getProfileState,
  getUserStatus,
  saveProfile,
} from "entities/profile";
import { getCurrentUser, getErrorMessages } from "entities/auth";
import { EditImgBtn } from "features";
import { useStoreDispatch, useStoreSelector } from "shared/lib/utils";

import s from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const dispatch = useStoreDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const { userProfile, error: profileError } =
    useStoreSelector(getProfileState);
  const currentUser = useStoreSelector(getCurrentUser);
  const errorMessages = useStoreSelector(getErrorMessages);

  const isOwner = useMemo(
    () => userProfile?.userId === currentUser?.userId,
    [userProfile, currentUser]
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  const refreshProfile = useCallback(() => {
    const userId: number | undefined =
      Number(params.userId) || currentUser?.userId;

    if (userId) {
      dispatch(getProfile(+userId));
      dispatch(getUserStatus(+userId));
    } else {
      navigate(ROUTE_PATH.MAIN);
    }
  }, [dispatch, navigate, params.userId, currentUser]);

  useEffect(() => {
    refreshProfile();
  }, [params.userId, refreshProfile]);

  const onSubmit = useCallback(
    (values: ProfileFormValues) => {
      dispatch(saveProfile(values));
      setEditMode(false);
    },
    [dispatch]
  );

  return (
    <>
      {profileError && <ErrorAlert message={profileError} />}
      {userProfile ? (
        <div className={s.ProfilePage}>
          <ProfileImg
            photoSrc={userProfile?.photos.large}
            editImgBtn={isOwner ? <EditImgBtn /> : undefined}
          />
          {editMode ? (
            <ProfileInfoForm
              errorMessages={errorMessages}
              onSubmit={onSubmit}
              {...userProfile}
            />
          ) : (
            <>
              <ProfileInfo isOwner={isOwner} {...userProfile} />
              {isOwner && (
                <ProfileEditButton onClick={() => setEditMode(true)} />
              )}
            </>
          )}
        </div>
      ) : (
        <Loader />
      )}

      {isOwner && <PostForm />}
      <PostsList />
    </>
  );
};

export default ProfilePage;
