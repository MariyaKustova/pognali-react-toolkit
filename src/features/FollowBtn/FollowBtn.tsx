import React, { FC } from "react";

import { Button } from "shared/ui";
import { follow, getFollowingInProgress, unfollow } from "entities/users";
import { useStoreDispatch, useStoreSelector } from "shared/lib/utils";

import s from "./FollowBtn.module.scss";

interface FollowBtnProps {
  id: number;
  followed: boolean;
}

const FollowBtn: FC<FollowBtnProps> = ({ id, followed }) => {
  const followingInProgress = useStoreSelector(getFollowingInProgress);
  const dispatch = useStoreDispatch();

  const foolowMethod = followed ? unfollow : follow;

  return (
    <Button
      className={s.FollowBtn}
      label={followed ? "Unfollow" : "Follow"}
      disabled={followingInProgress.some((userId) => userId === id)}
      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        dispatch(foolowMethod(id));
      }}
    />
  );
};

export default FollowBtn;
