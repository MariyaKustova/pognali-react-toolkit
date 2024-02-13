import React from "react";

import { getGoogleUrl } from "shared/lib/utils";
import { ROUTE_PATH } from "shared/lib/constants";

import s from "./OAuthGoogleLink.module.scss";

const OAuthGoogleLink = () => {
  return (
    <div className={s.OAuthGoogleLink}>
      <div className={s.OAuthGoogleLink__Container}>
        <div className={s.OAuthGoogleLink__Text}>
          Log in with another provider
        </div>
        <div className={s.OAuthGoogleLink__Wrapper}>
          <a
            className={s.OAuthGoogleLink__Link}
            href={getGoogleUrl(ROUTE_PATH.PROFILE_GOOGLE)}
          >
            <img
              src={
                "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              }
              alt="Логотип Google"
              style={{ height: "2rem" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default OAuthGoogleLink;
