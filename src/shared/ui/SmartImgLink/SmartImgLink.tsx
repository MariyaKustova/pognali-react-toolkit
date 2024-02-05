import React, { FC } from "react";

import s from "./SmartImgLink.module.scss";

interface SmartImgLinkProps {
  url?: string;
  title?: string;
  src?: string;
  alt?: string;
}

const SmartImgLink: FC<SmartImgLinkProps> = ({ url, title, src, alt }) => {
  return url ? (
    <a
      className={s.SmartImgLink}
      href={url}
      title={title}
      target="_blank"
      rel="noreferrer"
    >
      <img className={s.SmartImgLink__Img} src={src} alt={alt} />
    </a>
  ) : null;
};

export default SmartImgLink;
