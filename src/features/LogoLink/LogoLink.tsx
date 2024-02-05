import React from "react";
import { Link } from "react-router-dom";

import { ROUTE_PATH } from "shared/lib/constants";

const LogoLink = () => {
  return (
    <Link to={ROUTE_PATH.MAIN}>
      <picture>
        <source
          type="image/webp"
          media="(min-width: 1440px)"
          srcSet="
              ./img/webp/logo-desktop-white@1x.webp 1x,
              ./img/webp/logo-desktop-white@2x.webp 2x
            "
        />
        <source
          type="image/webp"
          media="(min-width: 768px)"
          srcSet="
              ./img/webp/logo-tablet-white@1x.webp 1x,
              ./img/webp/logo-tablet-white@2x.webp 2x
            "
        />
        <source
          type="image/webp"
          media="(min-width: 320px)"
          srcSet="
              ./img/webp/logo-mobile-white@1x.webp 1x,
              ./img/webp/logo-mobile-white@2x.webp 2x
            "
        />
        <source
          media="(min-width: 1440px)"
          srcSet="
              ./img/content/logo-desktop-white@1x.png 1x,
              ./img/content/logo-desktop-white@2x.png 2x
            "
        />
        <source
          media="(min-width: 768px)"
          srcSet="
              ./img/content/logo-tablet-white@1x.png 1x,
              ./img/content/logo-tablet-white@2x.png 2x
            "
        />
        <img
          src="./img/content/logo-mobile-white@1x.png"
          srcSet="./img/content/logo-mobile-white@2x.png 2x"
          loading="lazy"
          alt="Логотип"
        />
      </picture>
    </Link>
  );
};

export default LogoLink;
