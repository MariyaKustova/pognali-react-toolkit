import { Control, Controller } from "react-hook-form";

import { BaseInput } from "shared/ui";

export const createController = (
  name: string,
  control: Control<any>,
  props?: { [key: string]: string }
) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
      <BaseInput {...field} {...fieldState} {...props} />
    )}
  />
);
