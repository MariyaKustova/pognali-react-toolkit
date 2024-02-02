import React, { FC, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

import { TextArea } from "shared/ui";
import { useStoreDispatch } from "shared/lib/utils";
import { validateMessage } from "../../lib/helpers";
import { initialValues } from "../../lib/constants";
import { DialogFormValues } from "../../model/types";
import { sendMessage } from "entities/dialogs";

interface DialogFormProps {
  className?: string;
}

const DialogForm: FC<DialogFormProps> = ({ className }) => {
  const dispatch = useStoreDispatch();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
    resolver: validateMessage,
  });

  const onHandleSubmit = useCallback(
    (values: DialogFormValues) => {
      if (!values.newMessage) {
        return;
      }
      dispatch(sendMessage(values.newMessage));
      reset(initialValues);
    },
    [dispatch, reset]
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
            />
          );
        }}
      />
    </form>
  );
};

export default DialogForm;
