import { UserProfile } from "entities/profile/model/types";
import { FieldNames } from "../lib/constants";
import { Nullable } from "shared/model/types";

export interface Auth {
  id: Nullable<number>;
  email: Nullable<string>;
  login: Nullable<string>;
  isAuth: boolean;
}

export interface AuthState {
  auth: Auth;
  currentUser: Nullable<UserProfile>;
}

export interface LoginFormValues {
  [FieldNames.LOGIN]: string;
  [FieldNames.PASSWORD]: string;
  [FieldNames.REMEMBER_ME]: boolean;
  [FieldNames.CAPTCHA]?: string;
}

export interface requestLoginData {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
}

export interface ResponseDataBase<T> {
  resultCode: number;
  messages: string[];
  fieldsErrors?: string[];
  data: T;
}

export interface ResponseLogin {
  userId?: number;
}

export interface ResponseMe {
  id: number;
  email: string;
  login: string;
}

export interface ResponseLogout {
  userId: number;
}

export interface ResponseCaptcha {
  url: string;
}

export interface ResponseDataLogin {
  data: ResponseDataBase<ResponseLogin>;
}

export interface ResponseDataLogout {
  data: ResponseDataBase<ResponseLogout>;
}
export interface ResponseDataMe {
  data: ResponseDataBase<ResponseMe>;
}
