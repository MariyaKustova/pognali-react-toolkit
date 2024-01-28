import React, { FC, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { get } from "lodash";

import TextArea from "../../../../components/common/TextArea/TextArea";

interface DialogFormValues {
  newMessage: string;
}
interface DialogFormProps {
  onSubmit: (value: string) => void;
  disabled?: boolean;
  className?: string;
}
const checkMessageLength = (
  values: DialogFormValues,
  errors: { [key: string]: string },
  code: string
) => {
  const parameterName = get(values, code);
  if (typeof parameterName === "string" && parameterName.trim().length > 300) {
    errors[code] = "The message length cannot be more than 300 characters";
  }
};

const validateMessage = (values: DialogFormValues) => {
  const errors = {};
  checkMessageLength(values, errors, "newMessage");
  return { values, errors };
};

const defaultValues = {
  newMessage: "",
};

const DialogForm: FC<DialogFormProps> = ({ onSubmit, disabled, className }) => {
  const { control, handleSubmit, reset } = useForm({
    defaultValues,
    resolver: validateMessage,
  });

  const onHandleSubmit = useCallback(
    (values: DialogFormValues) => {
      onSubmit(values.newMessage);
      reset(defaultValues);
    },
    [onSubmit, reset]
  );

  return (
    <form className={className} onSubmit={handleSubmit(onHandleSubmit)}>
      <Controller
        name={"newMessage"}
        control={control}
        render={({ field, fieldState }) => {
          return (
            <TextArea
              {...field}
              {...fieldState}
              label="Add message"
              placeholder="Add new message"
              disabled={disabled}
            />
          );
        }}
      />
    </form>
  );
};

export default DialogForm;
