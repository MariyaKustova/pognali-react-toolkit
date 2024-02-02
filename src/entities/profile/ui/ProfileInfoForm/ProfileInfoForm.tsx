import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { ProfileInfoFormProps } from "../../model/types";
import { CONTACTS, defaultValues, FieldNames } from "../../lib/constants";
import { validateValues } from "../../lib/helpers";
import { ErrorMessage, Button, Checkbox } from "shared/ui";
import { generateKey } from "shared/lib/utils";
import { ProfileFormController } from "../ProfileFormController";
import { createController } from "../ProfileFormController/helpers";

import s from "./ProfileInfoForm.module.scss";

const ProfileInfoForm: FC<ProfileInfoFormProps> = ({
  aboutMe,
  lookingForAJob,
  lookingForAJobDescription,
  fullName,
  contacts,
  errorMessages,
  onSubmit,
}) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: validateValues,
  });

  useEffect(() => {
    reset({
      aboutMe,
      lookingForAJob,
      lookingForAJobDescription,
      fullName,
      contacts,
    });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.ProfileInfoForm}>
      <ProfileFormController name={FieldNames.FULL_NAME} control={control} />
      <Controller
        name={FieldNames.LOOKING_FOR_A_JOB}
        control={control}
        render={({ field }) => <Checkbox {...field} />}
      />
      <ProfileFormController
        name={FieldNames.LOOKING_FOR_A_JOB_DESCRIPTION}
        control={control}
      />
      <ProfileFormController name={FieldNames.ABOUT_ME} control={control} />
      {errorMessages &&
        errorMessages.map((message) => (
          <ErrorMessage key={generateKey(message)} message={message} />
        ))}
      <div className={s.ProfileInfoForm__contacts}>
        <span>Contacts:</span>
        <div className={s.ProfileInfoForm__contactsWrapper}>
          {CONTACTS.map((contact) => (
            <div key={contact}>
              {createController(`contacts.${contact}`, control)}
            </div>
          ))}
        </div>
      </div>

      <div className={s.ProfileInfoForm__buttonWrapper}>
        <Button
          label="Save"
          type="submit"
          className={s.ProfileInfoForm__button}
        />
      </div>
    </form>
  );
};

export default ProfileInfoForm;
