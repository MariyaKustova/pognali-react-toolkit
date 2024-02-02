import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { Nullable } from "shared/model/types";

export const useStoreDispatch: () => RootDispatch = useDispatch;
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector;

export const capitalizeFirstLetter = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1);

export const generateKey = (data: string) => {
  return `${data}_${new Date().getTime()}`;
};

export const editName = (name: string) => {
  const indexDot = name.indexOf(".");
  return indexDot ? name.substring(indexDot + 1) : name;
};

export const setSuccess = (state: {
  isFetching: boolean;
  error?: Nullable<string>;
}) => {
  state.isFetching = false;
  state.error = null;
};

export const setErrors = (
  state: { isFetching: boolean; error?: Nullable<string> },
  errorMessage: string
) => {
  state.isFetching = false;
  state.error = errorMessage;
};

export const setPending = (state: {
  isFetching: boolean;
  error?: Nullable<string>;
}) => {
  state.isFetching = true;
};
