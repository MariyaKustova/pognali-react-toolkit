import React, { ChangeEventHandler, ForwardedRef } from "react";
import classnames from "classnames";
import { FieldError } from "react-hook-form";

import Button from "../Button/Button";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

import s from "./TextArea.module.scss";

interface TextAreaProps {
  value: string;
  label?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  error?: FieldError | string;
  invalid?: boolean;
  isDirty?: boolean;
  isTouched?: boolean;
  disabled?: boolean;
}

const TextArea = React.forwardRef(
  (props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { value, label, onChange, placeholder, error, invalid, disabled = false } = props;

    return (
      <div className={s.TextArea__Wrapper}>
        <textarea
          className={classnames(s.TextArea, {
            [s.TextArea__errorTextArea]: invalid,
          })}
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Add new post"}
          ref={ref}
        />
        {error && <ErrorMessage message={error} />}
        <Button
          type="submit"
          className={s.TextArea__Button}
          label={label || "Add post"}
          disabled={disabled || !value}
        />
      </div>
    );
  }
);

export default TextArea;
