import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";

import { BaseInput } from "shared/ui";
import { LoginFormValues } from "../../model/types";

interface FormControllerProps {
  name: "captcha" | "password" | "login" | "rememberMe";
  control: Control<LoginFormValues, any>;
  additionalProps?: { [key: string]: string };
}

const FormController: FC<FormControllerProps> = ({
  name,
  control,
  additionalProps,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <BaseInput {...field} {...fieldState} {...additionalProps} />
      )}
    />
  );
};

export default FormController;
