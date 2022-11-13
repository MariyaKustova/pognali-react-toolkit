import React, { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { ProfileInfoFormProps } from "../../types";
import { CONTACTS, defaultValues, FieldNames } from "./constants";
import { createController } from "../../../Login/LoginForm/helpers";
import Button from "../../../../components/common/Button/Button";
import Checkbox from "../../../../components/common/Checkbox/Checkbox";
import ErrorMessage from "../../../../components/common/ErrorMessage/ErrorMessage";
import { generateKey } from "../../../../utils";
import { validateValues } from "../../helpers";
import { State } from "../../../../redux/reduxStore";
import { getErrorMessages } from "../../../../redux/selectors.ts/securitySelectors";

import s from "./ProfileInfoForm.module.scss";

const ProfileInfoForm: FC<ProfileInfoFormProps> = ({
  aboutMe,
  lookingForAJob,
  lookingForAJobDescription,
  fullName,
  contacts,
  onSubmit,
}) => {
  const errorMessages = useSelector((state: State) => getErrorMessages(state));

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
      {createController(FieldNames.FULL_NAME, control)}
      <Controller
        name={FieldNames.LOOKING_FOR_A_JOB}
        control={control}
        render={({ field }) => <Checkbox {...field} />}
      />
      {createController(FieldNames.LOOKING_FOR_A_JOB_DESCRIPTION, control)}
      {createController(FieldNames.ABOUT_ME, control)}
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
