import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { authAPI } from "../api/authApi";
import { profileAPI } from "../../profile/api/profileApi";
import { UserProfile } from "../../profile/model/types";
import { Auth, AuthState } from "./types";
import { Nullable } from "shared/model/types";
import { setErrors } from "entities/errors";

const initialState: AuthState = {
  auth: {
    id: null,
    email: null,
    login: null,
    isAuth: false,
  },
  currentUser: null,
};

export const authUser = createAsyncThunk<
  void,
  void,
  { dispatch: RootDispatch }
>("auth/authUser", async function (_, { dispatch }) {
  try {
    const data = await authAPI.auth();
    if (data.resultCode === 0) {
      const { id, email, login } = data.data;

      dispatch(setUserData({ id, email, login, isAuth: true }));
      const profileData = await profileAPI.getProfile(id);
      dispatch(setCurrentUser(profileData));
    } else {
      throw new Error(data.messages[0]);
    }
  } catch (error) {
    if (error instanceof Error) {
      dispatch(setErrors(error.message));
    }
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Auth>) => {
      state.auth = { ...action.payload };
    },
    setCurrentUser: (state, action: PayloadAction<Nullable<UserProfile>>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUserData, setCurrentUser } = authSlice.actions;

export default authSlice.reducer;
