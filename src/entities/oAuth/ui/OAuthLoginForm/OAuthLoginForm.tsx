import React, { FC, useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { getCookie, useStoreDispatch } from "shared/lib/utils";
import {
  OAuthFieldNames,
  OAuthLoginFormValues,
} from "entities/oAuth/model/types";
import { initialValues, schema } from "entities/oAuth/lib/constants";
import { BaseInput, Checkbox } from "shared/ui";
import {
  loginOAuthUser,
  registerOAuthUser,
  setIsOAuth,
} from "../../model/oAuthSlice";
import { LoginBtn } from "features";
import { ROUTE_PATH } from "shared/lib/constants";

import s from "./OAuthLoginForm.module.scss";

const OAuthLoginForm: FC<{ className?: string }> = ({ className }) => {
  const dispatch = useStoreDispatch();

  useEffect(() => {
    const isOAuth = getCookie("token");

    if (isOAuth) {
      dispatch(setIsOAuth(true));
      <Navigate to={ROUTE_PATH.PROFILE_GOOGLE} />;
    }
  }, []);

  const [isRegister, setIsRegister] = useState(false);

  const { control, handleSubmit } = useForm<OAuthLoginFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    (values: OAuthLoginFormValues) => {
      const { name, login, password, passwordConfirm } = values;
      isRegister
        ? dispatch(
            registerOAuthUser({
              name,
              email: login,
              password,
              passwordConfirm,
            })
          )
        : dispatch(loginOAuthUser({ email: login, password }));
    },
    [dispatch, isRegister]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={classNames(s.OAuthLoginForm, className)}
    >
      {isRegister && (
        <Controller
          name={OAuthFieldNames.OAUTH_NAME}
          control={control}
          render={({ field, fieldState }) => (
            <BaseInput {...field} {...fieldState} />
          )}
        />
      )}
      <Controller
        name={OAuthFieldNames.OAUTH_LOGIN}
        control={control}
        render={({ field, fieldState }) => (
          <BaseInput {...field} {...fieldState} />
        )}
      />
      <Controller
        name={OAuthFieldNames.OAUTH_PASSWORD}
        control={control}
        render={({ field, fieldState }) => (
          <BaseInput {...field} {...fieldState} type={"password"} />
        )}
      />
      {isRegister && (
        <Controller
          name={OAuthFieldNames.OAUTH_CONFIRM_PASSWORD}
          control={control}
          render={({ field, fieldState }) => (
            <BaseInput {...field} {...fieldState} type={"password"} />
          )}
        />
      )}
      <Checkbox
        value={isRegister}
        onChange={() => setIsRegister((prevState) => !prevState)}
        name={"register"}
      />
      <LoginBtn />
    </form>
  );
};

export default OAuthLoginForm;
