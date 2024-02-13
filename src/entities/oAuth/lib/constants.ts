import * as yup from "yup";

import { OAuthFieldNames } from "../model/types";

export const initialValues = {
  [OAuthFieldNames.OAUTH_NAME]: "",
  [OAuthFieldNames.OAUTH_LOGIN]: "",
  [OAuthFieldNames.OAUTH_PASSWORD]: "",
  [OAuthFieldNames.OAUTH_CONFIRM_PASSWORD]: "",
};

export const schema = yup
  .object({
    login: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
