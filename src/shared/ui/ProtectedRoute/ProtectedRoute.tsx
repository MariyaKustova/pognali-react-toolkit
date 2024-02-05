import React from "react";
import { Navigate } from "react-router-dom";

import { ROUTE_PATH } from "../../lib/constants";

const ProtectedRoute = ({
  isAuth,
  children,
}: {
  isAuth: boolean;
  children: JSX.Element;
}) => (!isAuth ? <Navigate to={ROUTE_PATH.LOGIN} /> : children);

export default ProtectedRoute;
