import { Nullable, RESPONSE_STATUS } from "shared/model/types";

export type OAuthUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string;
  verified: boolean;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OAuthState = { user: Nullable<OAuthUser>; isOAuth: boolean };

export enum OAuthFieldNames {
  OAUTH_NAME = "name",
  OAUTH_LOGIN = "login",
  OAUTH_PASSWORD = "password",
  OAUTH_CONFIRM_PASSWORD = "passwordConfirm",
}

export type RegisterUserPayload = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type RegisterUserResponse = {
  status: RESPONSE_STATUS;
  message?: string;
  data?: {
    user: OAuthUser;
  };
};

export type LoginUserPayload = Omit<
  RegisterUserPayload,
  "name" | "passwordConfirm"
>;

export type LoginUserResponse = Omit<RegisterUserResponse, "data">;

export interface OAuthLoginFormValues {
  [OAuthFieldNames.OAUTH_NAME]: string;
  [OAuthFieldNames.OAUTH_LOGIN]: string;
  [OAuthFieldNames.OAUTH_PASSWORD]: string;
  [OAuthFieldNames.OAUTH_CONFIRM_PASSWORD]: string;
}
