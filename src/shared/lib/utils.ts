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

export const getGoogleUrl = (from: string) => {
  const rootUrlOAuth = `https://accounts.google.com/o/oauth2/v2/auth`;
  const options = {
    redirect_uri: process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT as string,
    client_id: process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrlOAuth}?${qs.toString()}`;
};

export const getCookie = (name: string) => {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
