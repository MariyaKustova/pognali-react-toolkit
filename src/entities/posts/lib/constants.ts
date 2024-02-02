import * as yup from "yup";

export const schema = yup
  .object({
    newPost: yup
      .string()
      .max(1000, "The message length cannot be more than 1000 characters")
      .required(),
  })
  .required();

export const initialValues = {
  newPost: "",
};
