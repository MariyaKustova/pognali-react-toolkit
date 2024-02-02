import React from "react";

import { getPostsData } from "../../model/postsSelector";
import PostItem from "../PostItem";
import { UserIcon } from "shared/assets";
import { useStoreSelector } from "shared/lib/utils";

import s from "./PostsList.module.scss";

const PostsList = () => {
  const posts = useStoreSelector(getPostsData);

  return (
    <ul className={s.PostsList}>
      {posts.map((post, index) => (
        <PostItem
          key={index}
          photoSrc={UserIcon}
          message={post.message}
          countLikes={post.countLikes}
        />
      ))}
    </ul>
  );
};

export default PostsList;
