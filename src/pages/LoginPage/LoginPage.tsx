import React from "react";
import { Navigate } from "react-router-dom";

import { ROUTE_PATH } from "shared/lib/constants";
import { generateKey, useStoreSelector } from "shared/lib/utils";
import { ErrorMessage } from "shared/ui";
import { LoginForm, getErrorMessages, getIsAuth } from "entities/auth";

const LoginPage: () => JSX.Element = () => {
  const isAuth = useStoreSelector(getIsAuth);
  const errorMessages = useStoreSelector(getErrorMessages);

  if (isAuth) return <Navigate to={ROUTE_PATH.MAIN} />;

  return (
    <>
      <h1>Login</h1>
      {errorMessages &&
        errorMessages.map((message) => (
          <ErrorMessage key={generateKey(message)} message={message} />
        ))}
      <LoginForm />
    </>
  );
};

export default LoginPage;
