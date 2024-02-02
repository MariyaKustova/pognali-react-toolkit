import React from "react";

import s from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={s.NotFoundPage}>
      <h1 className={s.NotFoundPage__Title}>
        К сожалению, страница не найдена!
      </h1>
    </div>
  );
};

export default NotFoundPage;
