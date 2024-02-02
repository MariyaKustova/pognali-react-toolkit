declare type RootState = ReturnType<
  typeof import("./appStore").default.getState
>;
declare type RootDispatch = typeof import("./appStore").default.dispatch;
