import React from "react";
import classnames from "classnames";

import { getNavbarFriends } from "../../model/friendsSelectors";
import { FriendItem } from "shared/ui";
import { useStoreSelector } from "shared/lib/utils";

import s from "./FriendsSection.module.scss";

const FriendsSection = () => {
  const friends = useStoreSelector(getNavbarFriends);

  return (
    <div className={s.FriendsSection}>
      <div
        className={classnames(s.FriendsSection__Title, {
          [s.FriendsSection__TitleNotActive]: !friends.length,
        })}
      >
        Friends online
      </div>
      {friends.length ? (
        <div className={s.FriendsSection__Wrapper}>
          {friends.map((friend) => (
            <FriendItem key={friend.id} id={friend.id} name={friend.name} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FriendsSection;
