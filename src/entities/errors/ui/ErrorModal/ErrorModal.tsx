import React from "react";

import { getErrorsMessage, setErrors } from "entities/errors";

import { useStoreDispatch, useStoreSelector } from "shared/lib/utils";
import { Modal } from "shared/ui";

const ErrorModal = () => {
  const dispatch = useStoreDispatch();
  const errorsMessage = useStoreSelector(getErrorsMessage);

  return (
    <>
      {errorsMessage ? (
        <Modal
          title={"Error!"}
          message={errorsMessage}
          onClick={() => dispatch(setErrors(null))}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default ErrorModal;
