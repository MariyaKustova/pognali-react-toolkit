import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authAPI } from "../api/authApi";
import { securityAPI } from "../api/securityApi";
import { authUser, setCurrentUser, setUserData } from "./authSlice";
import {
  requestLoginData,
  ResponseCaptcha,
  ResponseDataBase,
  ResponseLogin,
  ResponseLogout,
} from "./types";
import { Nullable } from "shared/model/types";

export interface SecurityState {
  messages: Nullable<string[]>;
  captcha: Nullable<string>;
}

const initialState: SecurityState = {
  messages: [],
  captcha: null,
};

export const getCaptchaUrl = createAsyncThunk<
  void,
  void,
  { dispatch: RootDispatch }
>("security/getCaptchaUrl", async function (_, { dispatch }) {
  const data: ResponseCaptcha = await securityAPI.getCaptchaUrl();
  dispatch(setCapthaUrl(data.url));
});

export const loginUser = createAsyncThunk<
  void,
  requestLoginData,
  { dispatch: RootDispatch }
>("security/loginUser", async function (requestData, { dispatch }) {
  const data: ResponseDataBase<ResponseLogin> = await authAPI.login(
    requestData
  );
  switch (String(data.resultCode)) {
    case "0":
      dispatch(authUser());
      dispatch(setCapthaUrl(null));
      dispatch(setErrorMessage(null));
      break;
    case "1":
      dispatch(setErrorMessage(data.messages));
      break;
    case "10":
      dispatch(setErrorMessage(data.messages));
      dispatch(getCaptchaUrl());
      break;
    default:
      break;
  }
});

export const logoutUser = createAsyncThunk<
  void,
  void,
  { dispatch: RootDispatch }
>("security/logoutUser", async function (_, { dispatch }) {
  const data: ResponseDataBase<ResponseLogout> = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(
      setUserData({ id: null, email: null, login: null, isAuth: false })
    );
    dispatch(setCurrentUser(null));
  }
});

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setErrorMessage: (state, action: PayloadAction<Nullable<string[]>>) => {
      state.messages = action.payload;
    },
    setCapthaUrl: (state, action: PayloadAction<Nullable<string>>) => {
      state.captcha = action.payload;
    },
  },
});

export const { setErrorMessage, setCapthaUrl } = securitySlice.actions;

export default securitySlice.reducer;
