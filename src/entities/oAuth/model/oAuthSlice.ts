import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { setErrors } from "entities/errors";
import {
  LoginUserPayload,
  OAuthState,
  OAuthUser,
  RegisterUserPayload,
} from "./types";
import { OAuthAPI } from "../api/apiOAuth";
import { RESPONSE_STATUS } from "shared/model/types";

const initialState: OAuthState = { user: null, isOAuth: false };

export const registerOAuthUser = createAsyncThunk<
  void,
  RegisterUserPayload,
  { dispatch: RootDispatch }
>("oAuth/registerUser", async function (payload, { dispatch }) {
  try {
    const data = await OAuthAPI.register(payload);
    if (data && data?.data?.user) {
      dispatch(setOAuthUserData(data?.data?.user));
    } else {
      dispatch(setErrors(data?.message || "Error!"));
    }
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setErrors(error.message));
    }
  }
});

export const loginOAuthUser = createAsyncThunk<
  void,
  LoginUserPayload,
  { dispatch: RootDispatch }
>("oAuth/loginUser", async function (payload, { dispatch }) {
  try {
    const data = await OAuthAPI.login(payload);
    if (data.status === RESPONSE_STATUS.SUCCESS) {
      dispatch(setIsOAuth(true));
    } else {
      dispatch(setErrors(data?.message || "Error!"));
    }
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setErrors(error.message));
    }
  }
});

export const logoutOAuthUser = createAsyncThunk<
  void,
  void,
  { dispatch: RootDispatch }
>("oAuth/logoutUser", async function (_, { dispatch }) {
  try {
    const data = await OAuthAPI.logout();
    if (data.status === RESPONSE_STATUS.SUCCESS) {
      dispatch(setIsOAuth(false));
    } else {
      dispatch(setErrors(data?.message || "Error!"));
    }
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setErrors(error.message));
    }
  }
});

const authSlice = createSlice({
  name: "oAuth",
  initialState,
  reducers: {
    setOAuthUserData: (state, action: PayloadAction<OAuthUser>) => ({
      ...state,
      user: { ...action.payload },
    }),
    setIsOAuth: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isOAuth: action.payload,
    }),
  },
});

export const { setOAuthUserData, setIsOAuth } = authSlice.actions;

export default authSlice.reducer;
