import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { TextArea } from "shared/ui";
import { setNewPost } from "../../model/postsSlice";
import { initialValues, schema } from "../../lib/constants";
import { useStoreDispatch } from "shared/lib/utils";

const PostForm = () => {
  const dispatch = useStoreDispatch();

  const { control, handleSubmit, reset } = useForm({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onHandleSubmit = useCallback(
    (values: { newPost: string }) => {
      values.newPost.length && dispatch(setNewPost(values.newPost));
      reset(initialValues);
    },
    [dispatch, reset]
  );

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <Controller
        name={"newPost"}
        control={control}
        render={({ field, fieldState }) => {
          return <TextArea {...field} {...fieldState} />;
        }}
      />
    </form>
  );
};

export default PostForm;
