import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";

import { BaseInput } from "shared/ui";
import { ProfileFormValues } from "../../model/types";

interface ProfileFormControllerProps {
  name: "aboutMe" | "lookingForAJobDescription" | "fullName";
  control: Control<ProfileFormValues, any>;
  additionalProps?: { [key: string]: string };
}

const ProfileFormController: FC<ProfileFormControllerProps> = ({
  name,
  control,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BaseInput {...field} {...fieldState} />
      )}
    />
  );
};

export default ProfileFormController;
