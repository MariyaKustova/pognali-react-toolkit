import React from "react";
import { Route, Routes } from "react-router-dom";

import { HASH_STAR, ROUTE_PATH } from "shared/lib/constants";
import { useStoreSelector } from "shared/lib/utils";
import { ProtectedRoute } from "shared/ui";
import MainPage from "../pages/MainPage";
import { getIsAuth, getIsOAuth } from "entities/auth";

const DialogsPage = React.lazy(() => import("../pages/DialogsPage"));
const UsersPage = React.lazy(() => import("../pages/UsersPage"));
const ProfilePage = React.lazy(() => import("../pages/ProfilePage"));
const LoginPage = React.lazy(() => import("../pages/LoginPage"));
const OAuthPage = React.lazy(() => import("../pages/OAuthPage"));
const OAuthErrorPage = React.lazy(() => import("../pages/OAuthErrorPage"));
const ProfileGooglePage = React.lazy(
  () => import("../pages/ProfileGooglePage")
);
const InWorkPage = React.lazy(() => import("../pages/InWorkPage"));
const NotFoundPage = React.lazy(() => import("../pages/NotFoundPage"));

const Routing = () => {
  const isAuth = useStoreSelector(getIsAuth);
  const isOAuth = useStoreSelector(getIsOAuth);

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
          <ProtectedRoute isAuth={isAuth} path={ROUTE_PATH.LOGIN}>
            <DialogsPage />
          </ProtectedRoute>
        }
      />
      <Route path={`${ROUTE_PATH.USERS}`} element={<UsersPage />} />
      <Route
        path={`${ROUTE_PATH.PROFILE_GOOGLE}`}
        element={
          <ProtectedRoute isAuth={isOAuth} path={ROUTE_PATH.O_AUTH}>
            <ProfileGooglePage />
          </ProtectedRoute>
        }
      />
      <Route path={`${ROUTE_PATH.MUSIC}`} element={<InWorkPage />} />
      <Route
        path={`${ROUTE_PATH.SETTINGS}`}
        element={
          <ProtectedRoute isAuth={isAuth} path={ROUTE_PATH.LOGIN}>
            <InWorkPage />
          </ProtectedRoute>
        }
      />
      <Route path={`${ROUTE_PATH.LOGIN}`} element={<LoginPage />} />
      <Route path={`${ROUTE_PATH.O_AUTH}`} element={<OAuthPage />} />
      <Route path={`${ROUTE_PATH.O_AUTH_ERROR}`} element={<OAuthErrorPage />} />
      <Route path={`*`} element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routing;
