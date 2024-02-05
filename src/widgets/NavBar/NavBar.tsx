import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import { routes } from "shared/lib/constants";
import { FriendsSection, getFriends } from "entities/friends";
import { useStoreDispatch } from "shared/lib/utils";

import s from "./NavBar.module.scss";

const NavBar = () => {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    dispatch(getFriends({}));
  }, [dispatch]);

  return (
    <nav className={s.NavBar}>
      <ul>
        {routes.map((route) => (
          <li key={route.title}>
            <NavLink
              className={({ isActive }) =>
                isActive ? s.NavBar__ActiveLink : s.NavBar__Link
              }
              to={route.to}
            >
              {route.title}
            </NavLink>
          </li>
        ))}
        <li>
          <FriendsSection />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
