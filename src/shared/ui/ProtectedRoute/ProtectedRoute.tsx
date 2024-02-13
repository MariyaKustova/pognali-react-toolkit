import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  isAuth,
  path,
  children,
}: {
  isAuth: boolean;
  path: string;
  children: JSX.Element;
}) => {
  return !isAuth ? <Navigate to={path} /> : children;
};

export default ProtectedRoute;
