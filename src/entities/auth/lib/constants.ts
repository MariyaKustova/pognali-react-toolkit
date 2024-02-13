import * as yup from "yup";
import { FieldNames } from "../model/types";

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
