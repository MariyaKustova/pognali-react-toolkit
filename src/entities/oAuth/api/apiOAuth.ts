import { instanceAxiosOAuth } from "shared/api/instance";
import {
  LoginUserPayload,
  LoginUserResponse,
  RegisterUserPayload,
  RegisterUserResponse,
} from "../model/types";

export const OAuthAPI = {
  register(payload: RegisterUserPayload): Promise<RegisterUserResponse> {
    return instanceAxiosOAuth
      .post("auth/register", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data);
  },
  login(requestData: LoginUserPayload): Promise<LoginUserResponse> {
    return instanceAxiosOAuth
      .post("auth/login", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data);
  },
  logout() {
    return instanceAxiosOAuth
      .get("auth/logout")
      .then((response) => response.data);
  },
};
