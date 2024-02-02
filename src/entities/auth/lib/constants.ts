import * as yup from "yup";

export enum FieldNames {
  LOGIN = "login",
  PASSWORD = "password",
  REMEMBER_ME = "rememberMe",
  CAPTCHA = "captcha",
}

export const initialValues = {
  [FieldNames.LOGIN]: "",
  [FieldNames.PASSWORD]: "",
  [FieldNames.REMEMBER_ME]: false,
  [FieldNames.CAPTCHA]: "",
};

export const schema = yup
  .object({
    login: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
