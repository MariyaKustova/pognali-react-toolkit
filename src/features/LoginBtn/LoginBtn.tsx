import React from "react";

import { Button } from "shared/ui";

import s from "./LoginBtn.module.scss";

const LoginBtn = () => {
  return (
    <div className={s.LoginBtn}>
      <Button label="Login" type="submit" className={s.LoginBtn__button} />
    </div>
  );
};

export default LoginBtn;
