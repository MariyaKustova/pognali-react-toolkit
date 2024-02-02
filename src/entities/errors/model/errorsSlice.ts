import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Nullable } from "shared/model/types";

export interface ErrorsState {
  errors: Nullable<string>;
}

const initialState: ErrorsState = {
  errors: null,
};

export const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    setErrors: (state, action: PayloadAction<Nullable<string>>) => {
      state.errors = action.payload;
    },
  },
});

export const { setErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
