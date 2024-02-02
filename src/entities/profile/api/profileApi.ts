import { ProfileFormValues } from "../model/types";
import { instanceAxios } from "../../../shared/api/instance";

export const profileAPI = {
  getProfile(userId: number) {
    return instanceAxios
      .get(`profile/${userId}`)
      .then((response) => response.data);
  },
  getStatus(userId: number) {
    return instanceAxios
      .get(`profile/status/${userId}`)
      .then((response) => response.data);
  },
  updateStatus(status: string) {
    return instanceAxios
      .put(`profile/status`, { status })
      .then((response) => response.data);
  },
  savePhoto(photo: File) {
    const formData = new FormData();
    formData.append("image", photo);

    return instanceAxios
      .put(`profile/photo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data);
  },
  saveProfile(profile: ProfileFormValues) {
    return instanceAxios
      .put(`profile`, profile)
      .then((response) => response.data);
  },
};
