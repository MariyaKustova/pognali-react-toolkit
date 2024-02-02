import React, { FC } from "react";

import { UserItem } from "entities/users";
import { FollowBtn } from "features";
import { User } from "shared/model/types";

const UserCard: FC<User> = (props) => {
  return (
    <UserItem
      key={props.id}
      {...props}
      followBtn={<FollowBtn id={props.id} followed={props.followed} />}
    />
  );
};

export default UserCard;
