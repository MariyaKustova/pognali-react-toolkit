import React from "react";

import { getCurrentUser, getIsAuth } from "entities/auth";
import { LogInLink, LogoLink, LogoutBtn, UserLink } from "features";
import { useStoreSelector } from "shared/lib/utils";

import s from "./Header.module.scss";

const Header = () => {
  const isAuth = useStoreSelector(getIsAuth);
  const currentUser = useStoreSelector(getCurrentUser);

  return (
    <header className={s.Header}>
      <div className={s.Header__Wrapper}>
        <LogoLink />
        <div className={s.Header__rightContent}>
          {isAuth ? (
            <>
              <LogoutBtn />
              <UserLink
                photoSrc={currentUser?.photos.small}
                fullName={currentUser?.fullName}
              />
            </>
          ) : (
            <LogInLink />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
