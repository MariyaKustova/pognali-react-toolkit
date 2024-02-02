import React from "react";

import { Link } from "react-router-dom";
import { ROUTE_PATH } from "shared/lib/constants";

const LogInLink = () => {
  return <Link to={ROUTE_PATH.LOGIN}>Log in</Link>;
};

export default LogInLink;
