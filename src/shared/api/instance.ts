import axios from "axios";

export const instanceAxios = axios.create({
  withCredentials: true,
  headers: { "API-KEY": "19997782-d465-4301-8df7-198699b4772a" },
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
});

export const instanceAxiosOAuth = axios.create({
  withCredentials: true,
  baseURL: `${process.env.REACT_APP_SERVER_ENDPOINT}/api/`,
});
