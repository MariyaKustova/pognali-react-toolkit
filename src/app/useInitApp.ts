import { useCallback, useEffect } from "react";

import { initApp } from "./store/appSlice";
import { useStoreDispatch } from "shared/lib/utils";
import { setErrors } from "entities/errors";

export const useInitApp = () => {
  const dispatch = useStoreDispatch();

  const catchAllUnhandledErrors = useCallback(
    (e: PromiseRejectionEvent) => {
      dispatch(setErrors(e.reason.message));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(initApp());
    window.addEventListener("unhandledrejection", catchAllUnhandledErrors);

    return window.removeEventListener(
      "unhandledrejection",
      catchAllUnhandledErrors
    );
  }, [dispatch, catchAllUnhandledErrors]);
};
