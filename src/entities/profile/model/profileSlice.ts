import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ProfileFormValues, UserPhotos, UserProfile } from "./types";
import { profileAPI } from "../api/profileApi";
import { setErrorMessage } from "../../auth/model/securitySlice";
import { setErrors, setSuccess } from "shared/lib/utils";
import { Nullable } from "shared/model/types";

export interface ProfileState {
  userProfile: Nullable<UserProfile>;
  status: string;
  isFetching: boolean;
  error?: Nullable<string>;
}

const initialState: ProfileState = {
  userProfile: null,
  status: "",
  error: null,
  isFetching: false,
};

export const getProfile = createAsyncThunk<
  void,
  number,
  { dispatch: RootDispatch }
>("profile/getProfile", async function (userId, { dispatch, rejectWithValue }) {
  const data = await profileAPI.getProfile(+userId);
  dispatch(setUserProfile(data));
});

export const getUserStatus = createAsyncThunk<
  void,
  number,
  { dispatch: RootDispatch }
>("profile/getUserStatus", async function (userId, { dispatch }) {
  const data = await profileAPI.getStatus(+userId);
  dispatch(setUserStatus(data));
});

export const updateUserStatus = createAsyncThunk<
  void,
  string,
  { dispatch: RootDispatch }
>("profile/updateUserStatus", async function (status, { dispatch }) {
  const data = await profileAPI.updateStatus(status);
  if (data.resultCode === 0) {
    dispatch(setUserStatus(status));
  }
});

export const savePhoto = createAsyncThunk<
  void,
  File,
  { dispatch: RootDispatch }
>("profile/savePhoto", async function (photo, { dispatch }) {
  const data = await profileAPI.savePhoto(photo);
  if (data.resultCode === 0) {
    dispatch(setUserPhotosSuccess(data.data.photos));
  }
});

export const saveProfile = createAsyncThunk<
  void,
  ProfileFormValues,
  { dispatch: RootDispatch; state: RootState }
>("profile/saveProfile", async function (profile, thunkApi) {
  const userId = thunkApi.getState().profile?.userProfile?.userId;
  const data = await profileAPI.saveProfile(profile);
  if (data.resultCode === 0 && userId) {
    thunkApi.dispatch(setErrorMessage(null));
    thunkApi.dispatch(getProfile(userId));
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<Nullable<UserProfile>>) => {
      state.userProfile = action.payload;
    },
    setUserStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setUserPhotosSuccess: (state, action: PayloadAction<UserPhotos>) => {
      state.userProfile = {
        ...(state.userProfile as UserProfile),
        photos: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.fulfilled, setSuccess)
      .addCase(getProfile.rejected, (state, action) => {
        setErrors(state, "Server Error! Could not get a profile!");
      })
      .addCase(getUserStatus.fulfilled, (state) => setSuccess(state))
      .addCase(getUserStatus.rejected, (state) => {
        setErrors(state, "Server error! Could not get a status!");
      })
      .addCase(updateUserStatus.fulfilled, setSuccess)
      .addCase(updateUserStatus.rejected, (state) => {
        setErrors(state, "Server error! Failed to update status!");
      })
      .addCase(savePhoto.fulfilled, setSuccess)
      .addCase(savePhoto.rejected, (state) => {
        setErrors(state, "Server error! Failed to save photo!");
      })
      .addCase(saveProfile.fulfilled, setSuccess)
      .addCase(saveProfile.rejected, (state) => {
        setErrors(state, "Server error! Failed to save profile!");
      });
  },
});

export const { setUserProfile, setUserStatus, setUserPhotosSuccess } =
  profileSlice.actions;

export default profileSlice.reducer;
