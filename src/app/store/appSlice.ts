import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authUser } from "../../entities/auth/model/authSlice";

export interface AppState {
  initialized: boolean;
}

const initialState: AppState = {
  initialized: false,
};

export const initApp = createAsyncThunk<void, void, { dispatch: RootDispatch }>(
  "app/initApp",
  async function (_, { dispatch }) {
    const promise = dispatch(authUser());
    Promise.all([promise]).then(() => dispatch(appInitSuccess()));
  }
);

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appInitSuccess: (state) => {
      state.initialized = true;
    },
  },
});

export const { appInitSuccess } = appSlice.actions;

export default appSlice.reducer;
