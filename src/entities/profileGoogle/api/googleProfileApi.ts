import { instanceAxiosOAuth } from "shared/api/instance";
import { GoogleProfileResponse } from "../model/types";
import { AxiosResponse } from "axios";

export const googleProfileApi = {
  getGoogleProfile() {
    return instanceAxiosOAuth
      .get("/users/google-profile")
      .then(
        (response: AxiosResponse<GoogleProfileResponse>) => response.data.data
      );
  },
};
