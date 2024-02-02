import React from "react";

import { useStoreDispatch } from "shared/lib/utils";
import { savePhoto } from "entities/profile";

import s from "./EditImgBtn.module.scss";

const EditImgBtn = () => {
  const dispatch = useStoreDispatch();

  const onPhotoDownload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files) dispatch(savePhoto(e.currentTarget.files[0]));
  };

  return (
    <div className={s.EditImgBtn}>
      <label className={s.EditImgBtn__Label}>
        Выберите файл
        <input
          className={s.EditImgBtn__InputFile}
          type="file"
          onChange={onPhotoDownload}
        />
      </label>
    </div>
  );
};

export default EditImgBtn;
