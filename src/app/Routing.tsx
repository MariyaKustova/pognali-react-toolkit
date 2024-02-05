import React from "react";
import { Route, Routes } from "react-router-dom";

import { HASH_STAR, ROUTE_PATH } from "shared/lib/constants";
import { useStoreSelector } from "shared/lib/utils";
import { ProtectedRoute } from "shared/ui";
import MainPage from "../pages/MainPage";
import { getIsAuth } from "entities/auth";

const DialogsPage = React.lazy(() => import("../pages/DialogsPage"));
const UsersPage = React.lazy(() => import("../pages/UsersPage"));
const ProfilePage = React.lazy(() => import("../pages/ProfilePage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const InWorkPage = React.lazy(() => import("../pages/InWorkPage"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));

const Routing = () => {
  const isAuth = useStoreSelector(getIsAuth);

  return (
    <Routes>
      <Route path={ROUTE_PATH.MAIN} element={<MainPage />} />
      <Route path={ROUTE_PATH.PROFILE} element={<ProfilePage />}>
        <Route
          path={`${ROUTE_PATH.PROFILE}:userId`}
          element={<ProfilePage />}
        />
      </Route>
      <Route
        path={`${ROUTE_PATH.DIALOGS}${HASH_STAR}`}
        element={
          <ProtectedRoute isAuth={isAuth}>
            <DialogsPage />
          </ProtectedRoute>
        }
      />
      <Route path={`${ROUTE_PATH.USERS}`} element={<UsersPage />} />
      <Route path={`${ROUTE_PATH.NEWS}`} element={<InWorkPage />} />
      <Route path={`${ROUTE_PATH.MUSIC}`} element={<InWorkPage />} />
      <Route
        path={`${ROUTE_PATH.SETTINGS}`}
        element={
          <ProtectedRoute isAuth={isAuth}>
            <InWorkPage />
          </ProtectedRoute>
        }
      />
      <Route path={`${ROUTE_PATH.LOGIN}`} element={<LoginPage />} />
      <Route path={`*`} element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routing;
