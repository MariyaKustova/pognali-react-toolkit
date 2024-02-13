import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { GoogleProfile } from "./types";
import { Nullable } from "shared/model/types";
import { googleProfileApi } from "../api/googleProfileApi";

export interface ProfileGoogleState {
  userProfile: Nullable<GoogleProfile>;
}

const initialState: ProfileGoogleState = {
  userProfile: null,
};

export const getGoogleProfile = createAsyncThunk<
  void,
  void,
  { dispatch: RootDispatch }
>("googleProfile/getProfile", async function (_, { dispatch }) {
  const data = await googleProfileApi.getGoogleProfile();
  dispatch(setGoogleProfile(data.user));
});

const googleProfileSlice = createSlice({
  name: "googleProfile",
  initialState,
  reducers: {
    setGoogleProfile: (
      state,
      action: PayloadAction<Nullable<GoogleProfile>>
    ) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setGoogleProfile } = googleProfileSlice.actions;

export default googleProfileSlice.reducer;
