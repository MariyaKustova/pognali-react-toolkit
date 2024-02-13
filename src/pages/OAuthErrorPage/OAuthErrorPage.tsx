import React from "react";

import s from "./OAuthErrorPage.module.scss";

const OAuthErrorPage: () => JSX.Element = () => {
  return (
    <>
      <div className={s.OAuthErrorPage}>
        <div className={s.OAuthErrorPage__Text}>
          There were problems during authorization. <br /> Please try again
          later.
        </div>
      </div>
    </>
  );
};

export default OAuthErrorPage;
