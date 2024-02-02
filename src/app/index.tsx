import React, { Fragment } from "react";

import { useStoreSelector } from "shared/lib/utils";
import { Loader } from "shared/ui";
import { Header, NavBar } from "widgets";
import { getInitialized } from "app/store/appSelectors";
import { withProviders } from "./providers/withProviders";
import Routing from "./Routing";
import { useInitApp } from "./useInitApp";
import { ErrorModal } from "entities/errors";

import s from "./index.module.scss";

const App = () => {
  const initialized = useStoreSelector(getInitialized);

  useInitApp();

  return !initialized ? (
    <Loader />
  ) : (
    <Fragment>
      <Header />
      <div className={s.App__Wrapper}>
        <NavBar />
        <div className={s.App__Content}>
          <Routing />
        </div>
      </div>
      <ErrorModal />
    </Fragment>
  );
};

export default withProviders(App);
