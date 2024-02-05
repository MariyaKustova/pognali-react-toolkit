import React, { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Checkbox, Button } from "shared/ui";
import { useStoreDispatch, useStoreSelector } from "shared/lib/utils";
import { FieldNames, initialValues, schema } from "../../lib/constants";
import { LoginFormValues } from "../../model/types";
import FormController from "../FormController";
import { loginUser } from "../../model/securitySlice";
import { getCaptcha } from "../../model/securitySelectors";

import s from "./LoginForm.module.scss";

const LoginForm = () => {
  const dispatch = useStoreDispatch();

  const captcha = useStoreSelector(getCaptcha);

  const onSubmit = useCallback(
    (values: LoginFormValues) => {
      const { login, password, rememberMe, captcha } = values;
      dispatch(loginUser({ email: login, password, rememberMe, captcha }));
    },
    [dispatch]
  );

  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.LoginForm}>
      <FormController name={FieldNames.LOGIN} control={control} />
      <FormController
        name={FieldNames.PASSWORD}
        control={control}
        additionalProps={{ type: "password" }}
      />
      <Controller
        name={FieldNames.REMEMBER_ME}
        control={control}
        render={({ field }) => <Checkbox {...field} />}
      />
      {captcha && (
        <>
          <div className={s.LoginForm__captchaImg}>
            <img src={captcha} alt="Security text" />
          </div>
          <FormController name={FieldNames.CAPTCHA} control={control} />
        </>
      )}
      <div className={s.LoginForm__buttonWrapper}>
        <Button label="Login" type="submit" className={s.LoginForm__button} />
      </div>
    </form>
  );
};
export default LoginForm;
