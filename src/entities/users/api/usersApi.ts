import { instanceAxios } from "shared/api/instance";

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instanceAxios
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  follow(id: number) {
    return instanceAxios.post(`follow/${id}`);
  },
  unfollow(id: number) {
    return instanceAxios.delete(`follow/${id}`);
  },
};
