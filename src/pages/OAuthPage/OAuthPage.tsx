import React from "react";
import { Navigate } from "react-router-dom";

import { ROUTE_PATH } from "shared/lib/constants";
import { getIsOAuth } from "entities/auth";
import { OAuthGoogleLink } from "features";
import { useStoreSelector } from "shared/lib/utils";
import { OAuthLoginForm } from "entities/oAuth";

import s from "./OAuthPage.module.scss";

const OAuthPage: () => JSX.Element = () => {
  const isOAuth = useStoreSelector(getIsOAuth);

  if (isOAuth) return <Navigate to={ROUTE_PATH.PROFILE_GOOGLE} />;

  return (
    <>
      <h1>OAuth</h1>
      <OAuthLoginForm className={s.OAuthPage} />
      <OAuthGoogleLink />
    </>
  );
};

export default OAuthPage;
